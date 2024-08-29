class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :cpf, null: false
      t.date :birthday

      t.timestamps
    end
  end
end
