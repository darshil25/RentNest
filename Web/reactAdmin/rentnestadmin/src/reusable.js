import { Tooltip } from "bootstrap";
export const FONTS = {
  bold: "Poppins-Bold",
  black: "Poppins-Black",
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  semiItalic: "Poppins-SemiBoldItalic",
  mediumItalic: "Poppins-MediumItalic",
  italic: "Poppins-Italic",
};

export const KEYS = {
  google_key: "AIzaSyBcCBh1wLrK0wX_kGxxW2XBsZYfyFB9-40",
  PayPal_Client_ID: "",
  PayPal_Secret_key1: "",
};

export const SIZE = {
  font_11: 11,
  font_13: 13,
  font_15: 15,
  font_17: 17,
  font_20: 20,
};

export const COLORS = {
  darkGray: "#9A9999",
  borderClr: "#E8E6EA",
  pink: "#CB6CE6",
  lightGray: "#F5F5F5",
};

export const URL = {
  //   localurl:'http://216.10.247.209:8083/niromedia/company/'

  adminlocalurl: "http://localhost:5056/api/admin/",
};

// export const fetchFormData = async (url: string, raw: any) => {

//     var myHeaders = new Headers();
//     myHeaders.append('apitoken', '2ed1b72407c91c22dc7bd2b729f67145')

//     var requestOptions :any=
//     {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     let response = await fetch(URL.adminlocalurl + url, requestOptions)
//     let json = await response.json();

//     return json;
// }

export const fetchData = async (url, raw) => {
  var myHeaders = new Headers();
  myHeaders.append("apitoken", "b361dc54ca90a4dd02efaf412ed54f9a");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
  };

  let response = await fetch(`${URL.adminlocalurl}${url}`, requestOptions);
  let json = await response.json();
  return json;
};

export const fetchFormData = async (url, raw) => {
  var myHeaders = new Headers();
  myHeaders.append("apitoken", "b361dc54ca90a4dd02efaf412ed54f9a");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  // console.log("Formdata-------",requestOptions)
  let response = await fetch(URL.adminlocalurl + url, requestOptions);
  let json = await response.json();

  return json;
};

// export var createBootstrapTooltips = function () {
//   // var tooltipTriggerList = [].slice.call(
//   //   document.querySelectorAll('[data-bs-toggle="tooltip"]')
//   // );

//   // tooltipTriggerList.forEach(function (tooltipTriggerEl) {
//   //   var options = {};

//   //   if (
//   //     tooltipTriggerEl.hasAttribute("data-bs-dismiss") &&
//   //     tooltipTriggerEl.getAttribute("data-bs-dismiss") === "click"
//   //   ) {
//   //     options.dismiss = "click";
//   //   }

//   //   new Tooltip(tooltipTriggerEl, options);

//   //   // Dismiss tooltip on click event
//   //   tooltipTriggerEl.addEventListener("click", function () {
//   //     var tooltip = Tooltip.getInstance(tooltipTriggerEl);
//   //     if (tooltip) {
//   //       tooltip.hide();
//   //     }
//   //   });
//   // });

//   const tooltipTrigger = menuToggleRef.current;
//   if (tooltipTrigger) {
//     const tooltip = new bootstrap.Tooltip(tooltipTrigger, {
//       trigger: "manual", // Set trigger to manual
//     });

//     // Handle click event to toggle tooltip visibility
//     tooltipTrigger.addEventListener("click", () => {
//       if (tooltip._isOpen) {
//         tooltip.hide(); // Hide tooltip if already open
//       } else {
//         tooltip.show(); // Show tooltip on click
//       }
//     });

//     // Clean up on unmount or component update
//     return () => {
//       tooltip.dispose(); // Dispose of the tooltip when the component is unmounted or updated
//     };
//   }
// };

export const getadminId = async () => {
   var session = window.sessionStorage.getItem("admin");

   var adminDetails = {
     adminId: "",
   };

   if (session !== null) {
     adminDetails = JSON.parse(session);
   }

   return adminDetails.adminId.toString();
}