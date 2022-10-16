import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainPage } from "../pages/MainPage"
import { UserOrderPage } from "../pages/UserOrderPage"
import { UserCartPage } from "../pages/UserCartPage"
import { UpdatePage } from "../pages/UpdatePage"



export function Router() {

    return (      
            <BrowserRouter>
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path='Order' element={<UserOrderPage/>} /> 
                    <Route path='Cart/:id' element={<UserCartPage />} />    
                    <Route path='Update/:id' element={<UpdatePage />} />
                </Routes>
            </BrowserRouter>
    )
}