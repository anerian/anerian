helpers do
  #
  # sub_menu('about-menu', [ {:title => 'About', :desc => 'We thrive on productive chaos', :link => '/about' }, ... ])
  #
  def sub_menu(id, items=[])
    erb = ERB.new(File.read("#{AppRoot}/lib/partials/_sub_menu.erb"))
    erb.result(binding)
  end

end
