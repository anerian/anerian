class Post < ActiveRecord::Base
  set_table_name 'wp_posts'

  def excerpt
    if post_excerpt.blank?
      doc = Hpricot "<html><body>#{post_content}</body></html>"
      ps = (doc/:p)
      ps = ps.size > 2 ? ps[0..2] : (ps.size > 0 ? [ps.first] : [] )
      if ps.empty?
        return post_content
      else
        excerpt = ""
        ps.each do|p|
          excerpt += "<p>#{p.inner_html}</p>"
        end
        "#{excerpt}<a href='/#{ permalink }'>Read more...</a>"
      end
    else
      "#{post_excerpt}<a href='/#{ permalink }'>Read more...</a>"
    end
  end

  def permalink
    #parts = []
    #post_title.gsub(/\s/, '-').gsub(/[^\w-]/, '').downcase.squeeze('-').split('-').each do|p|
    #  parts << p
    #end
    # parts.join('-')
    "#{post_name}/#{post_date_gmt.strftime('%Y.%m.%d')}"
  end
end
