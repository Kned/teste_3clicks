class CreateAddresses < ActiveRecord::Migration[7.1]
  def change
    create_table :addresses do |t|
      t.string :street, null: false
      t.string :number
      t.string :complement
      t.references :user
      t.timestamps
    end
  end
end
