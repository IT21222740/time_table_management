const {
  registerUser,
  loginUser,
  currentUser,
} = require("../../controllers/userController");
const User = require("../../models/userModel");

jest.mock("../../models/userModel");

describe("registerUser", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        username: "fake",
        email: "fake",
        password: "fake",
        role: "admin",
      },
    };

    res = {
      status: jest.fn((x) => ({
        json: jest.fn(),
      })),
    };
  });

  it("should send a status code 400 when user already exists", async () => {
    User.findOne.mockReturnValueOnce({}); // Mock existing user

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should register a user and send status code 201", async () => {
    User.findOne.mockReturnValueOnce(null); // Mock user does not exist

    User.create.mockResolvedValueOnce({ _id: "fakeId", email: "fake" }); // Mock user creation

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("currentUser", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      user: {
        username: "fake",
        email: "fake",
        id: "fakeId",
        role: "admin",
      },
    };

    res = {
      json: jest.fn(),
    };
  });

  it("should send current user info", async () => {
    await currentUser(req, res);

    expect(res.json).toHaveBeenCalledWith(req.user);
  });
});

//testing github push
