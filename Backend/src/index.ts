import { app } from "./app";
import { UserBusiness } from "./busines/UserBusiness";
import { UserController } from "./controller/UserController";
import { UserDatabase } from "./data/UserDatabase";

const user = new UserController(
    new UserBusiness(
        new UserDatabase()
    )
)

app.post("/makeOrder", user.makeOrder)

app.patch("/populate", user.populate)

app.post("/AddProduct", user.AddProduct)

app.put("/updateOrder", user.updateOrder)

app.get("/getOrders", user.getOrders)

app.delete("/delOrder", user.delOrder)

app.delete("/removeProduct", user.removeProduct)

