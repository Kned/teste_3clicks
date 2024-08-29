5.times do |i|
  User.create(
    name: "Godofredo #{i}",
    email: "godofredo#{i}@email.com",
    cpf: "#{i}23.456.789-10",
    birthday: Date.parse("#{i+1}/04/1991") 
  )

end
15.times do |i|
  Address.create(
    street: "Rua #{i}",
    number: i,
    complement: "Setor #{i}",
    user_id: rand(5)+1
  )

end
