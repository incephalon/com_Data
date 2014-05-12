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

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SignIn(string returnUrl)
        {
            //send the district? (can I do this with the pwd in the other one?)

            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [SimpleMembership]
        public ActionResult Data(string district)
        {
            ViewBag.district = district;
            var x = district;
            return View();
        }

        [HttpPost]
        public ActionResult SignIn(string returnUrl, string pwd)
        {
            if (pwd == "123")
            {
                Session["myApp-Authentication"] = "123";

                return Redirect(returnUrl);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View();
        }


        public ActionResult SignOut()
        {
            Session["myApp-Authentication"] = null;
            Session.Remove("myApp-Authentication");
            return RedirectToAction("Index");
        }

    }
}
