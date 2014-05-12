using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using commitData.Helpers;

namespace commitData.Controllers
{
    public class DistrictDashboardController : Controller
    {
        //
        // GET: /DistrictDashboard/

        private static readonly Dictionary<string, string> DistrictPasswords = new Dictionary<string, string>
            {
                {"Coppell ISD", "123"},
                {"DESOTO ISD",          "456"},
                {"Grand Prairie I",     "789"},
                {"Irving ISD",          "123"},
                {"Lancaster ISD",       "123"},
                {"Mesquite ISD",        "123"},
                {"Richardson ISD",      "123"},
                {"UPLIFT EDUCATIO",     "123"},
                {"Highland Park I",     "123"},
                {"Dallas ISD",          "123"},
            };

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SignIn(string district)
        {
            //send the district? (can I do this with the pwd in the other one?)

            ViewBag.ReturnUrl = district;
            return View();
        }

        //[SimpleMembership]
        public ActionResult Data(string district)
        {
            var token = Session["myApp-Authentication"];
            if (token == null || !DistrictPasswords.ContainsKey(district) ||
                token.ToString() != DistrictPasswords[district])
            {
                return RedirectToAction("SignIn", new {district = district});
            }

            ViewBag.district = district;
            //var x = district;
            return View();
        }

        [HttpPost]
        public ActionResult SignIn(string district, string pwd)
        {
            //if (pwd == "123")
            //{
            Session["myApp-Authentication"] = pwd;
            return RedirectToAction("Data", new { district = district });
            //return Redirect(returnUrl);
            //}

            //ViewBag.ReturnUrl = returnUrl;
            //return View();
        }


        public ActionResult SignOut()
        {
            Session["myApp-Authentication"] = null;
            Session.Remove("myApp-Authentication");
            return RedirectToAction("Index");
        }

    }
}
