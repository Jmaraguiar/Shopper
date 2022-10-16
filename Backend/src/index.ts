import { app } from "./app";
import { IdGenerator } from "./busines/services/IdGenerator";
import { UserBusiness } from "./busines/UserBusiness";
import { UserController } from "./controller/UserController";
import { UserDatabase } from "./data/UserDatabase";

const user = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator
    )
)

app.post("/makeOrder", user.makeOrder)

app.patch("/populate", user.populate)

app.post("/AddProducts", user.AddProducts)

app.put("/orderCompleteUpdate/:id", user.orderCompleteUpdate)

app.put("/UpdateOrder", user.UpdateOrder)

app.get("/getAllOrders", user.getAllOrders)

app.get("/getAllProducts", user.getAllProducts)

app.delete("/delOrder/:id", user.delOrder)

app.delete("/removeProduct/:id", user.removeProduct)

