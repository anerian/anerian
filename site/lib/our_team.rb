module Sinatra
  module OurTeam
    def team_member(name,title,&block)
      @_out_buf << %(<div class='box'><h3>#{name}</h3><h4>#{title}</h4><p>)
      yield
      @_out_buf << %(</p></div>)
    end

    private

      def content_blocks
        @content_blocks ||= Hash.new {|h,k| h[k] = [] }
      end
  end
  helpers OurTeam
end
