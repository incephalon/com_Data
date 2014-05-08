using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver.Builders;
using MongoDB.Bson.IO;
using System.Web.Mvc;

namespace commitData.Controllers
{
    public class mongoController : ApiController
    {
        public dynamic Get(string district, string category, string field, string year)//send district & variable
        {
            string[] staars = { "grade3", "grade4", "grade5", "grade6", "grade7", "grade8", "a1", "bi", "r1", "r2", "w1", "w2", "us" };
            string[] EOCs = { "a1", "bi", "r1", "r2", "w1", "w2", "us"};

            List<string> fields = new List<string>();

            if (field == "begin")
            {
                fields.AddRange(new string[] { "CAMPUS", "CAMPNAME", "DISTRICT", "DISTNAME"});
            }
            else
            {
                fields.AddRange(new string[] { "CAMPUS", field });
            }

            var connectionString = "mongodb://incephalon:ygslva34$@ds039699-a0.mongolab.com:39699/commit_mongo";
            var client = new MongoClient(connectionString);
            var server = client.GetServer();
            var database = server.GetDatabase("commit_mongo");

            var collection = database.GetCollection<BsonDocument>(category);

            string[] splitter = district.Split(',');
            //now have to add '

            for (int f = 0; f < splitter.Length; f++)//get districts
            {
                if (EOCs.Contains(category))
                {
                    //splitter[f] = "0" + splitter[f];
                    if (splitter[f].Length == 6)
                    {
                        splitter[f] = splitter[f].Substring(1, 5);
                    }

                    if (splitter[f].Length == 5 && splitter[f].StartsWith("0"))
                    {
                        splitter[f] = splitter[f].Substring(1, 4);
                    }
                }

                if (staars.Contains(category))//add this for the staar
                {

                }
                else
                {
                    splitter[f] = "'" + splitter[f];
                }
            }

            var newArray = Array.ConvertAll(splitter, item => (BsonValue)item);
            //grab everything for a certain district?
            //var query = new QueryDocument("DISTRICT", district);

            var query2 = Query.And(Query.In("DISTRICT", newArray), Query.EQ("YEAR", year));

            //var result = database.GetCollection<BsonDocument>(category).Find(query2).ToArray();
            var result = database.GetCollection<BsonDocument>(category).Find(query2).SetFields(fields.ToArray()).ToArray();

            var s = result.ToJson(new JsonWriterSettings()

            {
                OutputMode = JsonOutputMode.JavaScript
            });

            return new ContentResult()
            {
                Content = s,
                ContentType = "text/json"
            };
        }
    }
}
