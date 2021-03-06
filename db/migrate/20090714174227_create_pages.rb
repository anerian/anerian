class CreatePages < ActiveRecord::Migration
  def self.up
    create_table :pages do |t|
      t.string :view
      t.string :title, :null => false
      t.string :permalink, :null => false 
      t.string :type
      t.integer :template_id, :null => false
      t.timestamps
    end
  end

  def self.down
    drop_table :pages
  end
end
