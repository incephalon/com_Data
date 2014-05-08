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

        public ActionResult SignIn()
        {
            //send the district? (can I do this with the pwd in the other one?)

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
        public ActionResult SignIn(string pwd)
        {
            if (pwd == "123")
            {
                Session["myApp-Authentication"] = "123";
                return RedirectToAction("Data");
            }
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
