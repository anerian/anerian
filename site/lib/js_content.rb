module Sinatra
  module JSContent
    def js_content(&block)
      #$packer ||= Rainpress::Packer.new
      before_buf = @_out_buf # store the current buffer
      @_out_buf = "" # reset the write buffer
      buf = block.call # capture the block content
      buf = JSMin.minify(buf)#$packer.compress(buf) # compress the block content
      @_out_buf = before_buf # add the before buffer content
      @_out_buf << buf # append our transformed new content
    end
  end
  helpers JSContent
end
