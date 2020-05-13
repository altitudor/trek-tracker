User.create(email: "monika.j.wilson@gmail.com", user_name: "monika", password: "testtest", admin: false)
User.create(email: "monika.j.wilson+admin@gmail.com", user_name: "admin", password: "testtest", admin: true)

Trail.create(name: "Lonesome Lake", api_id: 7044101)
Trail.create(name: "Hi-Cannon", api_id: 7018518)
Trail.create(name: "Lincoln Woods", api_id: 7010628)
Trail.create(name: "Mount Pemigewasset", api_id: 7044100)
Trail.create(name: "The Flume Gorge", api_id: 7079788)
Trail.create(name: "Liberty Spring", api_id: 7018539)
Trail.create(name: "Falling Waters", api_id: 7002866)


Note.create(note: "This hike is so fun, can be strenuous at times but great rewards with a lake at the end. Don't forget to get a brownie at the hut!", user: User.first, trail: Trail.first)
Note.create(note: "Love this hike! Can't wait to come back!", user: User.first, trail: Trail.third)
Note.create(note: "Wide, flat, maintained trail, great for trail running.", user: User.second, trail: Trail.second)
Note.create(note: "Relatively easy/quick hike with major payoffs, amazing views of the notch!", user: User.first, trail: Trail.fourth)
Note.create(note: "Easy hike, right off the highway, some areas are boardways for easy stepping, cool geological features, loads of tourists, though.", user: User.first, trail: Trail.fifth)
Note.create(note: "Nice hike any season, you can stay over at the hut for a cool experience.", user: User.second, trail: Trail.first)