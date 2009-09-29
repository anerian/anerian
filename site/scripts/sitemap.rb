#!/usr/bin/env ruby
# build a sitemap
pages = ['/anerian-way', '/blog', '/', '/our-team', '/strategy']
File.open("sitemap.xml","wb") {|f|
f <<  %(<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
)
for page in pages do 
  f << %(
  <url>
    <loc>http://anerian.com#{page}</loc>
  </url>
)
end
f << %(</urlset>)
}