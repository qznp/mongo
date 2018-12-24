db.createUser({
  user: "yanyan",
  pwd: "123456",
  customData: {
    name: "岩岩",
    age: 18
  },
  roles: [
    {
      role: "readWrite",
      db: "company"
    },
    "read"
  ]
});
