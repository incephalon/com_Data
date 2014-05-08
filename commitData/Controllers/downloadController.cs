using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;

namespace commitData.Controllers
{
    public class downloadController : Controller
    {
        [HttpPost]
        public ActionResult downloader(string reportData, string theHeaders)//, string[] selectedVariables
        {


            var json = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };

            List<string> myCSV = new List<string>();

            JavaScriptSerializer jss = new JavaScriptSerializer();
            var d = jss.Deserialize<dynamic>(reportData);

            var heads = jss.Deserialize<dynamic>(theHeaders);

            //add headers
            string headers = "";
            foreach (var item in heads)
            {
                headers += item + ",";
            }
            myCSV.Add(headers);

            //add data
            foreach (var item in d)
            {
                string inter = "";
                foreach (var sub in item)
                {
                    inter += sub.Value + ",";
                }

                myCSV.Add(inter);
            }

            System.IO.StreamWriter file = System.IO.File.CreateText(Server.MapPath("~/DownloadFile/commitReport.csv"));



            for (int f = 0; f < myCSV.Count; f++)
            {
                file.WriteLine(myCSV[f]);
            }

            file.Close();

            return Json(new { url = "/DownloadFile/commitreport.csv" });
        }


        public static T DeserializeJSon<T>(string jsonString)
        {
            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
            MemoryStream stream = new MemoryStream(Encoding.UTF8.GetBytes(jsonString));
            T obj = (T)ser.ReadObject(stream);
            return obj;
        }

    }
}













//var dict = (IDictionary<string, string>)json.DeserializeObject(reportData);



//List<string> stringers = new JavaScriptSerializer().Deserialize<List<string>>(reportData);
////List<string> stringers = new List<string>();
////stringers.Add("one");
////stringers.Add("two");
////stringers.Add("three");

//List<string> myCSV = new List<string>();

//for (int f = 0; f < stringers.Count; f++)
//{
//    myCSV.Add(stringers[f]);
//}


//System.IO.StreamWriter file = System.IO.File.CreateText(Server.MapPath("~/DownloadFile/commitReport.csv"));

//for (int f = 0; f < myCSV.Count; f++)
//{
//    file.WriteLine(myCSV[f]);
//}

//file.Close();


//DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(List<string>));
//MemoryStream stream = new MemoryStream(Encoding.UTF8.GetBytes(reportData));
//var obj = (List<string>)ser.ReadObject(stream);

//var obj = DeserializeJSon<List<string>>(reportData);

//JObject d = JObject.Parse("{\"CAMPUS\":\"'001902001\",\"CAMPNAME\":\"CAYUGA H S\",\"DISTRICT\":\"'001902\",\"DISTNAME\":\"CAYUGA ISD\",\"CPETG12C\":\"50\"}");

// JObject d = JObject.Parse(reportData);
//var dynamicObject = Json.Decode(jsonString);