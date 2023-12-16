const adminModels = require("../models/admin");
const userModels = require("../models/User");
const { errorResponse, successResponse } = require("../helper/index")
const fn = require("../helper/index");

const mongoose = require('mongoose');
const Admin = mongoose.model('admin');
const Service = mongoose.model('service');
const Requests = mongoose.model('requests');
const RequiredDocument = mongoose.model('serviceDocuments');
const Document = mongoose.model('document');
const ServiceDocuments = mongoose.model('serviceDocuments');
const RejectReasons = userModels.rejectReason;
const RequestStatus = userModels.requestStatus;
const Roles = adminModels.role;
const Notification = adminModels.notification;
const md5 = require('md5');
const document = require("mongoose/lib/document");

async function send_notification_to_checker(checkerId = "", message = "", rejectReason = "") {
    try {
        let checkerDetail = await Admin.findById(checkerId);
        // Ensure that checkerDetail.roleId is an ObjectId
        const roleId = new mongoose.Types.ObjectId(checkerDetail.roleId);
        let roleDetail = await Roles.findById(roleId);
        message += " by "
        message += roleDetail.name;

        let adminResults = [];
        let pipeline = [];

        if (roleDetail.name == "Checker 2") {
            pipeline = [
                {
                    $lookup: {
                        from: 'role', // The collection to join with
                        localField: 'roleId', // The field from the "admin" collection
                        foreignField: '_id', // The field from the "Role" collection
                        as: 'adminRole', // The field where the joined data will be stored
                    },
                },
                {
                    $match: {
                        'adminRole.name': 'Checker 1', // Match the role by name
                    },
                },
            ];
        }
        if (roleDetail.name == "Checker 3") {
            pipeline = [
                {
                    $lookup: {
                        from: 'role', // The collection to join with
                        localField: 'roleId', // The field from the "admin" collection
                        foreignField: '_id', // The field from the "Role" collection
                        as: 'adminRole', // The field where the joined data will be stored
                    },
                },
                {
                    $match: {
                        'adminRole.name': { $in: ['Checker 1', 'Checker 2'] }, // Match roles by name
                    },
                },
            ];
        }

        if (roleDetail.name == "Checker 4") {
            pipeline = [
                {
                    $lookup: {
                        from: 'role', // The collection to join with
                        localField: 'roleId', // The field from the "admin" collection
                        foreignField: '_id', // The field from the "Role" collection
                        as: 'adminRole', // The field where the joined data will be stored
                    },
                },
                {
                    $match: {
                        'adminRole.name': { $in: ['Checker 1', 'Checker 2', 'Checker 3'] }, // Match roles by name
                    },
                },
            ];
        }
        if (pipeline.length > 0) {
            adminResults = await Admin.aggregate(pipeline).exec();
        }

        for (let index = 0; index < adminResults.length; index++) {
            let notificationData = {
                adminId: new mongoose.Types.ObjectId(adminResults[index]._id.toString()),
                message: message,
                rejectReason: rejectReason,
                createdDate: moment().format('YYYY-MM-DD'),
                updatedDate: moment().format('YYYY-MM-DD')
            };

            var requeststatus = new Notification(notificationData);
            await requeststatus.save();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email == "" || email == null) {
            return errorResponse(res, "Enter Your Email.");
        }
        if (password == "" || password == null) {
            return errorResponse(res, "Enter Your Password.");
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return errorResponse(res, "Invalid email.");
        }
        const hashedPassword = md5(password);
        if (hashedPassword !== admin.password) {
            return errorResponse(res, "Invalid Password.");
        }
        var roleId = admin.roleId;
        const roleData = await Roles.findById(roleId);
        var data = {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            roleId: admin.roleId,
            type: admin.role,
            role: roleData.name
        };
        successResponse(res, "Login Successful", data);
    } catch (err) {
        console.log(err);
        errorResponse(res, "Something Went Wrong")
    }
};

// Add service api
const addService = async (req, res) => {
    try {
        const { serviceName, serviceType } = req.body;

        if (serviceName == "" || serviceName == null) {
            return errorResponse(res, "Enter Service Name.");
        }

        if (serviceType == "" || serviceType == null) {
            return errorResponse(res, "Enter Service Type.");
        }

        const addservice = new Service({
            serviceName,
            serviceType,
        });

        await addservice.save();

        successResponse(res, "Service Add successfully");
    } catch (err) {
        res, err
    }
};

// view service api
const viewService = async (req, res) => {
    try {
        const { serviceId } = req.body

        let service;
        if (serviceId) {
            service = await Service.findById(serviceId);
        } else {
            service = await Service.find();
        }

        if (!service) {
            return errorResponse(res, "Service not found");
        }

        successResponse(res, "Data Fetch Successful", service);
    } catch (err) {
        res, err
    }
};

// Delete Service Apis
const deleteService = async (req, res) => {
    try {
        const { serviceId } = req.body;

        const deletedService = await Service.findByIdAndDelete({ _id: serviceId });

        if (!deletedService) {
            return errorResponse(
                res,
                'Service not found'
            );
        }
        res.json(
            res,
            'Service deleted successfully'
        );
    } catch (err) {
        res, err
    }
};

// Update Service API
const updateService = async (req, res) => {
    try {
        const { serviceId, serviceType, serviceName } = req.body;
        if (serviceId == "" || serviceId == null) {
            return errorResponse(res, "Enter Service Id.");
        }
        const updatedService = await Service.findByIdAndUpdate(serviceId, {
            serviceType,
            serviceName,
        })
        if (serviceType == "" || serviceType == null) {
            return errorResponse(res, "Enter Service Type.");
        }
        if (serviceName == "" || serviceName == null) {
            return errorResponse(res, "Enter Service Name.");
        }
        if (!updatedService) {
            return errorResponse(
                res,
                'Service not found'
            );
        }
        successResponse(res, 'Service updated successfully');
    } catch (err) {
        res, err
    }
};

async function fetchStatusData(alldata) {
    const data = [];

    for (const request of alldata) {
        const totalRequestPromise = RequestStatus.find({ requestId: request._id.toString() });

        // Wait for the totalRequestPromise to resolve
        const totalRequest = await totalRequestPromise;

        // Add statusDetail to the request
        request.statusDetail = totalRequest;

        // Add the modified request to the data array
        data.push(request);
    }
    return data;
}

// view request api
const viewRequest = async (req, res) => {
    let { status, type, role } = req.body;
    try {
        type = (!type || type == undefined || type == null || type == "") ? 'Application' : type;
        role = (!role || role == undefined || role == null || role == "") ? 'Checker 1' : role;
        data = [];
        const statusArray = ['Approved', 'Rejected', 'Closed', 'Pending', 'Status', 'Yet To Received'];
        if (!statusArray.includes(status)) {
            return errorResponse(res, 'Invalid Status');
        }

        if (status == 'Rejected') {
            if (!rejectionType || rejectionType == "" || rejectionType == null || rejectionType == undefined) {
                return errorResponse(res, 'Rejection Type Required');
            }

            const rejectionTypeArray = ['Final Rejection', 'Interim Rejection'];
            if (!rejectionTypeArray.includes(rejectionType)) {
                return errorResponse(res, 'Invalid Rejection Type');
            }

            if ((!rejectReason || rejectReason == "" || rejectReason == null || rejectReason == undefined) && (!customReason || customReason == "" || customReason == null || customReason == undefined)) {
                return errorResponse(res, 'Rejection Reason Required');
            }
        }
        let query;
        query = {
            bankDetails: { $exists: true }
        };
        if (role == 'Checker 1') {
            adminLogin = 'checker1';
            if (status == "Pending") {
                query = {
                    checker1: null,
                    bankDetails: { $exists: true }
                };
            }
            else if (status == "Closed") {
                query = {
                    status: "2"
                };
            }
            else if (status == "Status") {
                query = {
                    [`${adminLogin}.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                }
            }
        }

        if (role == 'Checker 2') {
            adminLogin = 'checker2';
            if (status == "Pending") {
                query = {
                    [`checker1.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker1.status`]: 'Approved', // Checker1.checkerId is not null
                    checker2: null
                };
            }
            else if (status == "Closed") {
                query = {
                    status: "2"
                };
            }
            else if (status == "Status") {
                query = {
                    [`checker1.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker1.status`]: 'Approved',
                    [`${adminLogin}.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                }
            }
        }

        if (role == 'Checker 3') {
            adminLogin = 'checker3';
            if (status == "Pending") {
                query = {
                    [`checker1.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker1.status`]: 'Approved',
                    [`checker2.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker2.status`]: 'Approved',
                    checker3: null
                };
            }
            else if (status == "Closed") {
                query = {
                    status: "2"
                };
            }
            else if (status == "Status") {
                query = {
                    [`checker1.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker1.status`]: 'Approved',
                    [`checker2.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker1.status`]: 'Approved',
                    [`${adminLogin}.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                }
            }
        }

        if (role == 'Checker 4') {
            adminLogin = 'checker4';
            if (status == "Pending") {
                query = {
                    [`checker1.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker1.status`]: 'Approved',
                    [`checker2.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker2.status`]: 'Approved',
                    [`checker3.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker3.status`]: 'Approved',
                    checker4: null
                };
            }
            else if (status == "Closed") {
                query = {
                    status: "2"
                };
            }
            else if (status == "Approved" || status == "Rejected") {
                query = {
                    [`checker1.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker1.status`]: 'Approved',
                    [`checker2.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker2.status`]: 'Approved',
                    [`checker3.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`checker3.status`]: 'Approved',
                    [`${adminLogin}.checkerId`]: { $ne: null }, // Checker1.checkerId is not null
                    [`${adminLogin}.status`]: status
                }
            }
            else if (status == "Yet To Received") {
                query = {
                    $and: [
                        {
                            $and: [
                                { [`checker1.checkerId`]: { $ne: null } },
                                { [`checker1.status`]: 'Approved' },
                            ],
                        },
                        {
                            $or: [
                                {
                                    $and: [
                                        { [`checker2.checkerId`]: { $ne: null } },
                                        { [`checker2.status`]: 'Approved' },
                                    ],
                                },
                                {
                                    [`checker2`]: null
                                }
                            ]
                        },
                        {
                            $or: [
                                {
                                    $and: [
                                        { [`checker3.checkerId`]: { $ne: null } },
                                        { [`checker3.status`]: 'Approved' },
                                    ],
                                },
                                {
                                    [`checker3`]: null
                                }
                            ]
                        }
                    ],
                };
            }
        }

        let filteredRequests = await Requests.find(query);
        for (let i = 0; i < filteredRequests.length; i++) {

            var tmpstatus = [];
            if (filteredRequests[i].checker1 && filteredRequests[i].checker1 != null) {
                var tmpobj = {};
                tmpobj._id = filteredRequests[i].checker1._id ?? ""
                tmpobj.checkerId = filteredRequests[i].checker1.checkerId ?? ""
                tmpobj.status = filteredRequests[i].checker1.status ?? "Pending"
                tmpobj.rejectionType = filteredRequests[i].checker1.rejectionType ?? ""
                tmpobj.rejectReason = filteredRequests[i].checker1.rejectReason ?? ""
                tmpobj.customReason = filteredRequests[i].checker1.customReason ?? ""
                tmpobj.__v = filteredRequests[i].checker1.__v ?? "0"
                tmpstatus.push(tmpobj);
            }
            else {
                var tmpobj = {};
                tmpobj._id = ""
                tmpobj.checkerId = ""
                tmpobj.status = "Pending"
                tmpobj.rejectionType = ""
                tmpobj.rejectReason = ""
                tmpobj.customReason = ""
                tmpobj.__v = "0"
                tmpstatus.push(tmpobj);
            }

            if (filteredRequests[i].checker2 && filteredRequests[i].checker2 != null) {
                var tmpobj = {};
                tmpobj._id = filteredRequests[i].checker2._id ?? ""
                tmpobj.checkerId = filteredRequests[i].checker2.checkerId ?? ""
                tmpobj.status = filteredRequests[i].checker2.status ?? "Pending"
                tmpobj.rejectionType = filteredRequests[i].checker2.rejectionType ?? ""
                tmpobj.rejectReason = filteredRequests[i].checker2.rejectReason ?? ""
                tmpobj.customReason = filteredRequests[i].checker2.customReason ?? ""
                tmpobj.__v = filteredRequests[i].checker2.__v ?? "0"
                tmpstatus.push(tmpobj);
            }
            else {
                var tmpobj = {};
                tmpobj._id = ""
                tmpobj.checkerId = ""
                tmpobj.status = "Pending"
                tmpobj.rejectionType = ""
                tmpobj.rejectReason = ""
                tmpobj.customReason = ""
                tmpobj.__v = "0"
                tmpstatus.push(tmpobj);
            }

            if (filteredRequests[i].checker3 && filteredRequests[i].checker3 != null) {
                var tmpobj = {};
                tmpobj._id = filteredRequests[i].checker3._id ?? ""
                tmpobj.checkerId = filteredRequests[i].checker3.checkerId ?? ""
                tmpobj.status = filteredRequests[i].checker3.status ?? "Pending"
                tmpobj.rejectionType = filteredRequests[i].checker3.rejectionType ?? ""
                tmpobj.rejectReason = filteredRequests[i].checker3.rejectReason ?? ""
                tmpobj.customReason = filteredRequests[i].checker3.customReason ?? ""
                tmpobj.__v = filteredRequests[i].checker3.__v ?? "0"
                tmpstatus.push(tmpobj);
            }
            else {
                var tmpobj = {};
                tmpobj._id = ""
                tmpobj.checkerId = ""
                tmpobj.status = "Pending"
                tmpobj.rejectionType = ""
                tmpobj.rejectReason = ""
                tmpobj.customReason = ""
                tmpobj.__v = "0"
                tmpstatus.push(tmpobj);
            }

            if (filteredRequests[i].checker4 && filteredRequests[i].checker4 != null) {
                var tmpobj = {};
                tmpobj._id = filteredRequests[i].checker4._id ?? ""
                tmpobj.checkerId = filteredRequests[i].checker4.checkerId ?? ""
                tmpobj.status = filteredRequests[i].checker4.status ?? "Pending"
                tmpobj.rejectionType = filteredRequests[i].checker4.rejectionType ?? ""
                tmpobj.rejectReason = filteredRequests[i].checker4.rejectReason ?? ""
                tmpobj.customReason = filteredRequests[i].checker4.customReason ?? ""
                tmpobj.__v = filteredRequests[i].checker4.__v ?? "0"
                tmpstatus.push(tmpobj);
            }
            else {
                var tmpobj = {};
                tmpobj._id = ""
                tmpobj.checkerId = ""
                tmpobj.status = "Pending"
                tmpobj.rejectionType = ""
                tmpobj.rejectReason = ""
                tmpobj.customReason = ""
                tmpobj.__v = "0"
                tmpstatus.push(tmpobj);
            }

            var tmpdata = {};
            tmpdata._id = filteredRequests[i]._id ?? ""
            tmpdata.customerId = filteredRequests[i].customerId ?? ""
            tmpdata.is_completed = filteredRequests[i].is_completed ?? ""
            tmpdata.status = filteredRequests[i].status ?? ""
            tmpdata.updatedDate = filteredRequests[i].updatedDate ?? ""
            tmpdata.tadbeerCenter = filteredRequests[i].tadbeerCenter ?? ""
            tmpdata.type = filteredRequests[i].type ?? ""
            tmpdata.applicationNumber = filteredRequests[i].applicationNumber ?? ""
            tmpdata.emiratesID = filteredRequests[i].emiratesID ?? ""
            tmpdata.emiratesExpiryDate = filteredRequests[i].emiratesExpiryDate ?? ""
            tmpdata.createdDate = filteredRequests[i].createdDate ?? ""
            tmpdata.__v = filteredRequests[i].__v ?? ""
            tmpdata.address = filteredRequests[i].address ?? ""
            tmpdata.dateOfBirth = filteredRequests[i].dateOfBirth ?? ""
            tmpdata.employmentDetails = filteredRequests[i].employmentDetails ?? ""
            tmpdata.fullName = filteredRequests[i].fullName ?? ""
            tmpdata.gender = filteredRequests[i].gender ?? ""
            tmpdata.maritalStatus = filteredRequests[i].maritalStatus ?? ""
            tmpdata.nationality = filteredRequests[i].nationality ?? ""
            tmpdata.noOfDependents = filteredRequests[i].noOfDependents ?? ""
            tmpdata.passport = filteredRequests[i].passport ?? ""
            tmpdata.qualifications = filteredRequests[i].qualifications ?? ""
            tmpdata.references = filteredRequests[i].references ?? ""
            tmpdata.residenceVisa = filteredRequests[i].residenceVisa ?? ""
            tmpdata.typeOfLiability = filteredRequests[i].typeOfLiability ?? ""
            tmpdata.otherExpensis = filteredRequests[i].otherExpensis ?? ""
            tmpdata.typeOfLiability = filteredRequests[i].typeOfLiability ?? ""
            tmpdata.statusDetail = tmpstatus ?? []

            data.push(tmpdata);
        }
        successResponse(res, "Data Fetch Successful", data);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

const status = async (req, res) => {
    const { requestId, status } = req.body;
    try {
        const request = await Requests.findById(requestId);

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        if (status) {
            request.status = 1;
        } else {
            request.status = 0;
        }

        await request.save();

        successResponse(res, "Request status updated successfully");
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Delete Request Apis
const deleteRequest = async (req, res) => {
    try {
        const { requestId } = req.body;

        const deletedRequest = await Requests.findByIdAndDelete({ _id: requestId });

        if (!deletedRequest) {
            return errorResponse(
                res,
                'Request not found'
            );
        }

        successResponse(res, 'Request deleted Successfully');
    } catch (err) {
        res, err
    }
};

// Update Request API
const updateRequest = async (req, res) => {
    try {
        const { requestId, customerId, serviceId, dateOfBirth, maritalStatus, passport, residentVisa, emirates, is_completed } = req.body;
        const age = calculateAge(dateOfBirth);
        const existingRequest = await Requests.findByIdAndUpdate(requestId, {
            serviceId,
            customerId,
            Age: age,
            maritalStatus,
            passport,
            residentVisa,
            emirates,
            is_completed
        })
        if (!existingRequest) {
            return errorResponse(res, 'Request not found.');
        }

        if (customerId) {
            const customer = await Customer.findById(customerId);
            if (!customer) {
                return errorResponse(res, "Customer not found.");
            }

            const dob = moment(customer.dateOfBirth).format('DD/MM/YYYY');
            if (dob !== dateOfBirth) {
                return errorResponse(res, "Date of birth does not match.");
            }
        }

        if (passport.number === "" || passport.expiryDate == null) {
            return errorResponse(res, "Enter Passport details.");
        }
        if (residentVisa.number === "" || residentVisa.expiryDate === "" || residentVisa.issueDate === "") {
            return errorResponse(res, "Enter Resident Visa details.");
        }

        // Save the updated request
        await existingRequest.save();

        successResponse(res, "Data Successfully Updated");
    } catch (err) {
        errorResponse(res, err.message);
    }
};


// Delete Document Name Api
const deleteRequiredDocument = async (req, res) => {
    try {
        const { documentNameId } = req.body;

        const deleteRequiredDocument = await Document.findByIdAndDelete({ _id: documentNameId });

        if (!deleteRequiredDocument) {
            return errorResponse(
                res,
                'Document Name not found'
            );
        }
        successResponse(res, 'Document Name deleted Successfully');
    } catch (err) {
        res, err
    }
};

const documentStatus = async (req, res) => {
    const { requests_id, status } = req.body;

    try {
        const document = await ServiceDocuments.findById(requests_id);
        if (!document) {
            return errorResponse(res, 'Document not found');
        }

        if (status === 1 || status === 2) {
            document.Is_verify = status;
        } else {
            return errorResponse(res, 'Invalid status. Use 1 for approve or 2 for reject.');
        }

        await document.save();

        const statusText = status === 1 ? 'approved' : 'rejected';
        successResponse(res, `Document ${statusText} successfully`);
    } catch (err) {
        res, err
    }
};

// Add Document Name API
const addRequiredDocument = async (req, res) => {
    try {
        const { documentName } = req.body;

        if (documentName == "" || documentName == null) {
            return errorResponse(res, "Enter Document Name.");
        }

        const addRequiredDocument = new Document({
            documentName,
        });

        await addRequiredDocument.save();

        successResponse(res, "Document Add Successfully");
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// View Document Name API
const viewRequiredDocument = async (req, res) => {
    try {
        const document = await Document.find({});
        return successResponse(res, "Data Fetch Successful", document);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Update Document Name API
const updateRequiredDocument = async (req, res) => {
    try {
        const { documentNameId, documentName } = req.body;
        if (documentNameId == "" || documentNameId == null) {
            return errorResponse(res, "Enter Document Name Id.");
        }
        const updatedDocumentName = await Document.findByIdAndUpdate(documentNameId, {
            documentName
        })
        if (documentName == "" || documentName == null) {
            return errorResponse(res, "Enter Document Name.");
        }

        if (!updatedDocumentName) {
            return errorResponse(res, 'Document Name not found');
        }

        await updatedDocumentName.save()

        successResponse(res, 'Document Name updated Successfully');
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Update Document Name API
const viewRequestDetail = async (req, res) => {
    try {
        const { requestId } = req.body;

        if (!requestId) {
            return errorResponse(res, 'Request Id Required');
        }

        data = await Requests.findById(requestId);
        if (!data) {
            return errorResponse(res, 'Invalid Request Id');
        }

        successResponse(res, 'Detail Get Successfully', data);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// view request document
const viewRequestDocuments = async (req, res) => {
    let { requestId, checkerId, role } = req.body;

    try {
        role = (role) ? role : "Checker 1";
        if (!requestId) {
            return errorResponse(res, 'Request Id Required');
        }
        if (!checkerId) {
            return errorResponse(res, 'Checker Id Required');
        }
        const requests = await ServiceDocuments.find({ requestId: requestId });

        let data = [];
        if (requests.length > 0) {
            for (let index = 0; index < requests.length; index++) {
                const element = requests[index];

                const requestsVerification = await RequestStatus.find({ requestId: element._id, checkerId: checkerId, type: "Document" });

                let tmpdata = {};
                tmpdata._id = element._id ?? ""
                tmpdata.requestId = element.requestId ?? ""
                tmpdata.documentName = element.documentName ?? ""
                tmpdata.documentPath = element.documentPath ?? ""
                tmpdata.uploadPath = element.uploadPath ?? ""
                tmpdata.is_signed = element.is_signed ?? ""
                tmpdata.Is_verify = "0";
                if (role == "Checker 1") {
                    if (element.checker1 && element.checker1.status) {
                        tmpdata.Is_verify = element.checker1.status;
                    }
                }
                if (role == "Checker 2") {
                    if (element.checker2 && element.checker2.status) {
                        tmpdata.Is_verify = element.checker2.status;
                    }
                }
                if (role == "Checker 3") {
                    if (element.checker3 && element.checker3.status) {
                        tmpdata.Is_verify = element.checker3.status;
                    }
                }
                if (role == "Checker 4") {
                    if (element.checker4 && element.checker4.status) {
                        tmpdata.Is_verify = element.checker4.status;
                    }
                }
                tmpdata.createdDate = element.createdDate ?? ""
                tmpdata.updatedDate = element.updatedDate ?? ""
                tmpdata.__v = element.__v ?? ""

                data.push(tmpdata);
            }
        }

        successResponse(res, "Data Fetch Successful", data);

    } catch (err) {
        errorResponse(res, err.message);
    }
};

const updateRequestStatus = async (req, res) => {
    let { requestId, checkerId, status, rejectionType, rejectReason, customReason, role } = req.body;
    try {

        rejectionType = (rejectionType) ? rejectionType : ""
        rejectReason = (rejectReason) ? rejectReason : ""
        customReason = (customReason) ? customReason : ""
        role = (role) ? role : "Checker 1"

        if (!requestId) {
            return errorResponse(res, 'Request Id Required');
        }
        const requests = await Requests.findById({ _id: requestId });
        if (!requests) {
            return errorResponse(res, 'Invalid Request Id');
        }

        if (!checkerId) {
            return errorResponse(res, 'Checker Id Required');
        }

        if (!status || status == "" || status == null || status == undefined) {
            return errorResponse(res, 'Status Required');
        }

        const statusArray = ['Approved', 'Rejected', 'Closed', 'Pending', 'Status', 'Yet To'];
        if (!statusArray.includes(status)) {
            return errorResponse(res, 'Invalid Status');
        }

        if (status == 'Rejected') {
            if (role == 'Checker 1') {
                console.log("role", role);
                if (!rejectionType || rejectionType == "" || rejectionType == null || rejectionType == undefined) {
                    return errorResponse(res, 'Rejection Type Required');
                }

                const rejectionTypeArray = ['Final Rejection', 'Interim Rejection'];
                if (!rejectionTypeArray.includes(rejectionType)) {
                    return errorResponse(res, 'Invalid Rejection Type');
                }
                if ((!rejectReason || rejectReason == "" || rejectReason == null || rejectReason == undefined) && (!customReason || customReason == "" || customReason == null || customReason == undefined)) {
                    return errorResponse(res, 'Rejection Reason Required');
                }
            }
            if (role == 'Checker 2' || role == 'Checker 3' || role == 'Checker 4') {

                if ((!customReason || customReason == "" || customReason == null || customReason == undefined)) {
                    return errorResponse(res, 'Custom Reason Required');
                }
            }
        }

        let canApproveTheRequest = 1;


        if (role == 'Checker 1') {
            var checker1 = {
                checkerId: checkerId,
                rejectionType: rejectionType,
                rejectReason: rejectReason,
                customReason: customReason,
                status: status
            }

            var field = {
                checker1
            }

            // let requestsDocuments = await ServiceDocuments.find({ requestId: requestId });

            // db.yourCollectionName.find({
            //     "requestId": "64ccd8c870b1860b1afd75e4",
            //     "checker1": { $ne: null, "status": "Approved" }
            // })

        }

        if (role == 'Checker 2') {
            var checker2 = {
                checkerId: checkerId,
                rejectionType: rejectionType,
                rejectReason: rejectReason,
                customReason: customReason,
                status: status
            }

            var field = {
                checker2
            }


        }

        if (role == 'Checker 3') {
            var checker3 = {
                checkerId: checkerId,
                rejectionType: rejectionType,
                rejectReason: rejectReason,
                customReason: customReason,
                status: status
            }

            var field = {
                checker3
            }
        }

        if (role == 'Checker 4') {
            var checker4 = {
                checkerId: checkerId,
                rejectionType: rejectionType,
                rejectReason: rejectReason,
                customReason: customReason,
                status: status
            }

            var field = {
                checker4
            }
        }

        let requeststatus = await Requests.findByIdAndUpdate(requestId, field)
        return successResponse(res, "success", requeststatus);

    } catch (err) {
        errorResponse(res, err.message);
    }
};

const closeRequest = async (req, res) => {
    let { requestId } = req.body;
    try {
        if (!requestId) {
            return errorResponse(res, 'Request Id Required');
        }
        const requests = await Requests.find({ requestId: requestId });
        if (!requests) {
            return errorResponse(res, 'Invalid Request Id');
        }

        if (requests.checker1 != null && requests.checker2 != null && requests.checker3 != null && requests.checker4 != null) {
            await Requests.findByIdAndUpdate(requestId, {
                status: 2,
            })
            return successResponse(res, "Application Closed");
        }
        else {
            return errorResponse(res, "You can't close applecation before all checkers take action");
        }

    } catch (err) {
        errorResponse(res, err.message);
    }
};

const updateRequestDocumentStatus = async (req, res) => {
    let { documentId, Is_verify, rejectionType, rejectReason, customReason, checkerId, role } = req.body;
    try {

        rejectionType = (rejectionType) ? rejectionType : ""
        rejectReason = (rejectReason) ? rejectReason : ""
        customReason = (customReason) ? customReason : ""
        role = (role) ? role : "Checker 1"

        if (!checkerId) {
            return errorResponse(res, 'Checker Id Required');
        }

        if (!documentId) {
            return errorResponse(res, 'Document Id Required');
        }

        const documentdetail = await ServiceDocuments.findById(documentId);
        if (!documentdetail) {
            return errorResponse(res, 'Invalid Document Id');
        }

        if (!Is_verify || Is_verify == "" || Is_verify == null || Is_verify == undefined) {
            return errorResponse(res, 'Status Required');
        }

        Is_verify = parseInt(Is_verify);
        const statusArray = [0, 1, 2];
        if (!statusArray.includes(Is_verify)) {
            return errorResponse(res, 'Invalid Status');
        }

        if (role == 'Checker 1') {
            var checker1 = {
                checkerId: checkerId,
                rejectionType: rejectionType,
                rejectReason: rejectReason,
                customReason: customReason,
                status: Is_verify
            }

            var field = {
                Is_verify,
                checker1
            }
        }

        if (role == 'Checker 2') {
            var checker2 = {
                checkerId: checkerId,
                rejectionType: rejectionType,
                rejectReason: rejectReason,
                customReason: customReason,
                status: Is_verify
            }

            var field = {
                Is_verify,
                checker2
            }
        }

        if (role == 'Checker 3') {
            var checker3 = {
                checkerId: checkerId,
                rejectionType: rejectionType,
                rejectReason: rejectReason,
                customReason: customReason,
                status: Is_verify
            }

            var field = {
                Is_verify,
                checker3
            }
        }

        if (role == 'Checker 4') {
            var checker4 = {
                checkerId: checkerId,
                rejectionType: rejectionType,
                rejectReason: rejectReason,
                customReason: customReason,
                status: Is_verify
            }

            var field = {
                Is_verify,
                checker4
            }
        }
        // Now This Is Not Useful
        // Because we are keeping hiatory in requeststatus collection
        var updatedocumentstatus = await ServiceDocuments.findByIdAndUpdate(documentId, field, { new: true })
        await updatedocumentstatus.save();


        // let cheker = {
        //     requestId: documentId,
        //     checkerId: checkerId,
        //     status: Is_verify,
        //     rejectionType: rejectionType,
        //     rejectReason: rejectReason,
        //     customReason: customReason,
        //     type: "Document"
        // };

        //keep status history checker wise
        // const requeststatusdata = await RequestStatus.findOne({ requestId: documentId, checkerId: checkerId, type: "Document" });
        // if (requeststatusdata && requeststatusdata != null) {
        //     let requeststatusId = requeststatusdata._id.toString();
        //     var requeststatus_doc = await RequestStatus.findByIdAndUpdate(requeststatusId, cheker, { new: true })
        //     await requeststatus_doc.save();
        // } else {
        //     var requeststatus_doc = new RequestStatus(cheker);
        //     await requeststatus_doc.save();
        // }
        let requestdetail = await Requests.findById(documentdetail.requestId);
        if (requestdetail) {
            let message = "";
            message += "Document - " + documentdetail.documentName + " Is "
            message += (Is_verify == 1 || Is_verify == "1") ? " Approved " : " Rejected "
            message += " Of Application No - " + requestdetail.applicationNumber;
            // send_notification_to_checker(checkerId, message, rejectReason)
        }
        return successResponse(res, "Document Status Updated Successfully", updatedocumentstatus);

    } catch (err) {
        errorResponse(res, err.message);
    }
};

const rejectReasonList = async (req, res) => {
    let { rejectReason } = req.body;
    try {

        // rejectReason = (rejectReason) ? rejectReason : ""
        // if ((!rejectReason || rejectReason == "" || rejectReason == null || rejectReason == undefined) && (!customReason || customReason == "" || customReason == null || customReason == undefined)) {
        //     return errorResponse(res, 'Rejection Reason Required');
        // }

        var requeststatus = await RejectReasons.find();

        return successResponse(res, "success", requeststatus);

    } catch (err) {
        errorResponse(res, err.message);
    }
}

/*
const notification = async (req, res) => {
    let { adminId } = req.body;
    try {

        if (!adminId || adminId == "" || adminId == null || adminId == undefined) {
            return errorResponse(res, 'Admin Id /Checker Id Required');
        }

        const requests = await Requests.find({ requestId: requestId });

        return successResponse(res, "success", requeststatus);

    } catch (err) {
        errorResponse(res, err.message);
    }
}
*/

module.exports = {
    login,
    addService,
    viewService,
    deleteService,
    updateService,
    documentStatus,
    addRequiredDocument,
    updateRequiredDocument,
    viewRequest,
    updateRequest,
    deleteRequest,
    deleteRequiredDocument,
    status,
    viewRequiredDocument,
    viewRequestDetail,
    viewRequestDocuments,
    updateRequestStatus,
    rejectReasonList,
    updateRequestDocumentStatus,
    closeRequest
};
