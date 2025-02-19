import { StatusCodes } from "http-status-codes";
import CustomError from "../error/index.js";
import User from "../models/user.js";
import { sanitizedUser, isUuidv4 } from "../utils/index.js";
import Token from "../models/token.js";
import { userStatus } from "../config/config.js";
import redisClient from "../db/redis.js";

const UserController = {
  getMenus: async (req, res) => {
    let { page = 1, limit = 5, query = "", category = "" } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    console.log(
        "================",
        `limit ${limit}, page ${page}, query ${query} category ${category}`
    );
    
    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
        throw new CustomError.BadRequest("Invalid pagination values");
    }
    const offset = page * limit - limit;

    const menus = await User.findAll({
        // where: category ? { category: category } : {},
        where: {
            isAvailable: true,
            category: category ? category : { [Op.like]: "%" },
        },
        limit: limit,
        offset: offset,
    });

    const formattedMenus = menus.map((menu) => ({
        ...menu.dataValues,
        imageUrl: menu.imageUrl.map(
            (img) => `http://localhost:5000/api/v1/images/menu/${img}`
        ),
    }));

    let totalCount;
    if (query !== "" && category !== "") {
        totalCount = await Menu.count();
    } else {
        totalCount = await Menu.count({
            where: {
                name: {
                    // Case-insensitive search on name (SQLite handles this automatically)
                    [Op.like]: `%${query}%`,
                },
                // If category is provided, search for it, otherwise search for all categories
                category: category ? category : { [Op.like]: "%" },
            },
        });
    }

    return res.status(StatusCodes.OK).json({
        success: true,
        data: { menus: formattedMenus, length: totalCount },
    });
},
  getUsers: async (req, res) => {
    // const user = req.user;
    // res.status(StatusCodes.OK).json({
    //   success: true,
    //   message: "Get profile successful",
    //   data: { user },
    // });
    try {
      // Extract query parameters
      let { page = 1, limit = 10, query = "", category = "" } = req.query;
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);

      // Validate pagination values
      if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
          throw new CustomError.BadRequest("Invalid pagination values");
      }

      // Calculate offset
      const offset = (page - 1) * limit;

      // Build the query options
      const queryOptions = {
          limit: limit,
          offset: offset,
      };

      // Add filtering logic if query or category is provided
      if (query || category) {
          queryOptions.where = {};
          if (query) {
              queryOptions.where.firstName = { [Op.like]: `%${query}%` }; // Example: Filter by firstName
          }
          if (category) {
              queryOptions.where.role = category; // Example: Filter by role
          }
      }

      // Fetch paginated users
      const users = await User.findAll(queryOptions);

      // Count total number of users (with filters applied, if any)
      const totalUsers = await User.count({ where: queryOptions.where });

      // Return response
      return res.status(StatusCodes.OK).json({
          success: true,
          message: "Users retrieved successfully",
          data: users,
          total: totalUsers, // Send total count to the frontend
          page: page,
          limit: limit,
      });
  } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Something went wrong while fetching users",
      });
  }
    
  },

  updateProfile: async (req, res) => {
    // Your update profile logic here
    const { id } = req.user;
    const { firstName, lastName, phone } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Something went wrong try again later");
    }

    // Update only the fields provided in the request body
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    // if (imageUrl !== undefined) user.imageUrl = imageUrl;

    await user.save();

    const sanitizeUser = sanitizedUser(user.toJSON());

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Update profile successful",
      data: {
        user: sanitizeUser,
      },
    });
  },

updateStatus : async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;


    if (!isUuidv4(id)) {
        throw new CustomError.BadRequest("Unsupported ID");
    }

    if (!userStatus.includes(status)){
        throw new CustomError.BadRequest("Unsupported Status type...");

    }
    try {
        // Find the user by ID
        const user = await User.findByPk(id);

        if (!user) {
            throw new CustomError.BadRequest("User not found");

        }
        if (status === "inactive" || status === "baned"){
            const logRecord = await Token.findAll({where: {
                userId: user.id,

            }})
            // console.log(logRecord)
            for (const token of logRecord) {
                console.log(token.token);
                await redisClient.del(token.token);
            }
            
             
       }

        

        // Update user status
        await user.update({ status });

        res.json(user);
    } catch (err) {
        console.error("Error updating user status:", err);
        res.status(500).json({ error: "Internal server error" });
    }
},
};
export default UserController;