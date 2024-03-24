const {
  getCourses,
  getCourse,
  publishCourse,
  updateCourse,
  deleteCourese,
} = require("../../controllers/courseController");
const Course = require("../../models/courseModel");
const Faculty = require("../../models/faculty");

jest.mock("../../models/courseModel");
jest.mock("../../models/faculty");

describe("Course Controller", () => {
  describe("getCourses", () => {
    it("should return all courses", async () => {
      const mockCourses = [{ name: "Course 1" }, { name: "Course 2" }];
      Course.find.mockResolvedValue(mockCourses);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getCourses(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCourses);
    });
  });

  describe("getCourse", () => {
    it("should return a course when it exists", async () => {
      const mockCourse = { name: "Mock Course" };
      Course.findOne.mockResolvedValue(mockCourse);

      const req = { params: { id: "mockCourseId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getCourse(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCourse);
    });

    it("should return 404 when course does not exist", async () => {
      Course.findOne.mockResolvedValue(null);

      const req = { params: { id: "nonExistentCourseId" } };
      const res = {
        status: jest.fn((x) => ({
          json: jest.fn(),
        })),
      };

      await getCourse(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("publishCourse", () => {
    it("should publish a course when all fields are provided correctly", async () => {
      const mockFaculty = { _id: "mockFacultyId" };
      Faculty.findOne.mockResolvedValue(mockFaculty);

      const mockCourse = { _id: "mockCourseId", name: "Mock Course" };
      Course.create.mockResolvedValue(mockCourse);

      const req = {
        body: {
          name: "Mock Course",
          code: "MCK101",
          credits: 3,
          facultyUserName: "mockFaculty",
          description: "Mock Course Description",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await publishCourse(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCourse);
    });

    // Add more test cases for validation scenarios
  });

  describe("updateCourse", () => {
    it("should update a course when it exists", async () => {
      const mockCourse = { _id: "mockCourseId", name: "Mock Course" };
      Course.findOne.mockResolvedValue(mockCourse);
      Course.findByIdAndUpdate.mockResolvedValue(mockCourse);

      const req = {
        params: { id: "mockCourseId" },
        body: { name: "Updated Course" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateCourse(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCourse);
    });

    it("should return 404 when course does not exist", async () => {
      Course.findOne.mockResolvedValue(null);

      const req = {
        params: { id: "nonExistentCourseId" },
        body: { name: "Updated Course" },
      };
      const res = {
        status: jest.fn((x) => ({
          json: jest.fn(),
        })),
      };

      await updateCourse(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("deleteCourse", () => {
    it("should delete a course when it exists", async () => {
      const mockCourse = { _id: "mockCourseId", name: "Mock Course" };
      Course.findOne.mockResolvedValue(mockCourse);
      Course.findByIdAndDelete.mockResolvedValue(mockCourse);

      const req = { params: { id: "mockCourseId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteCourese(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCourse);
    });

    it("should return 404 when course does not exist", async () => {
      Course.findOne.mockResolvedValue(null);

      const req = { params: { id: "nonExistentCourseId" } };
      const res = {
        status: jest.fn((x) => ({
          json: jest.fn(),
        })),
      };

      await deleteCourese(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
