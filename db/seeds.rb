User.create(email: "monika.j.wilson@gmail.com", user_name: "monika", password: "testtest", admin: false)
User.create(email: "monika.j.wilson+admin@gmail.com", user_name: "admin", password: "testtest", admin: true)

Trail.create(name: "Lonesome Lake")
Trail.create(name: "Cannon")
Trail.create(name: "Lincoln Woods")


Note.create(note: "Fun!", user: User.first, trail: Trail.first)
Note.create(note: "gorgeous", user: User.first, trail: Trail.third)
Note.create(note: "nice hike", user: User.second, trail: Trail.second)
