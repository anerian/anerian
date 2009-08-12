require 'content_for'
require 'rainpress'
require 'css_content'
require 'our_team'

helpers do

  def video(id, video, width, height)
    #flashvars = 'config={"plugins": {"pseudo": {"url": "http://anerian.ws/flash/flowplayer/flowplayer.pseudostreaming-3.1.2.swf"}, "controls": {"backgroundColor": "transparent", "backgroundGradient": "none", "buttonColor": "transparent", "all": false } }, "clip": {"url": "http://anerian.ws/files/test.flv", "autoPlay": true, "provider": "pseudo"}}';
    video_base   = 'http://anerian.ws/files/MDEyY2NlNDIzYWQ2/51YKYf3oQVH1'
    config = ActiveSupport::JSON.encode({
      "plugins" => {
        "pseudo" => {
          "url" => "http://anerian.ws/flash/flowplayer/flowplayer.pseudostreaming-3.1.2.swf"
        }
      },
      "clip" => {
        "autoPlay" => false,
        "provider" => "pseudo",
        "url" => "#{ video_base }.mp4"
      }
    })
    flash_config = %(config=#{config})
    flash_player = "http://anerian.ws/flash/flowplayer/flowplayer-3.1.0.swf"
    erb = ERB.new(File.read("#{AppRoot}/lib/partials/_video.erb"))
    erb.result(binding)
  end

end
