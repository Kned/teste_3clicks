class Address < ApplicationRecord
  belongs_to :user
  validates :street, presence: true
  validates :number, presence: true
end
