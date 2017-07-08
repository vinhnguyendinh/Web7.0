const fs = require("fs");
const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/// Get links
var links = [];

var linkCrawler = new Crawler({
  maxConnections    : 1,
  jQuery            : jsdom,
  callback          : function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var dom = new JSDOM(res.body);
      var contents = dom.window.document.querySelectorAll(".title a");

      /// Create list link paper
      for (var i = 0; i < contents.length; i++) {
        var href = contents[i].href.trim();
        console.log(href);
        links.push(`http://laodong.com.vn/cong-nghe${href}`);
      }
    }
    c.queue(links);

    done();
  }
});
linkCrawler.queue("http://laodong.com.vn/cong-nghe/");

/// Save paper into file
var paperNo = 1;

var c = new Crawler({
    maxConnections : 1,
    jQuery         : jsdom,
    // This will be called for each crawled page
    callback       : function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var dom = new JSDOM(res.body);
            var contents = dom.window.document.querySelectorAll(".cms-body p");

            /// Create paper
            var paper = [];
            for (var i = 0; i < contents.length; i++) {
              paper.push(contents[i].textContent);
            }

            /// Write file
            if (paper.length > 0) {
              fs.writeFile(`text${paperNo}.txt`, paper, "utf-8", (err) => {
                if (err) throw err;
              });
              paperNo++;
            }
        }
        done();
    }
});
