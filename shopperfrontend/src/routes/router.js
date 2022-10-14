import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AdminLoginPage } from "../pages/AdminLoginPage"
import { MainPage } from "../pages/MainPage"



export function Router() {

    return (      
            <BrowserRouter>
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path='login' element={<AdminLoginPage />} />   
                </Routes>
            </BrowserRouter>
    )
}