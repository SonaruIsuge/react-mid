import { useState } from "react";
import { Drawer } from "antd";
import NavItem from "./NavItem";
import HamMenu from "./HamMenu";

export default function NavBar() {
    const [isOnTouch, setIsOnTouch] = useState(false);
    const handleCloseDrawer = () => setIsOnTouch(false);

    return(
        <div>
            <HamMenu 
                onClick={() => setIsOnTouch(!isOnTouch)} 
                isOnTouch={isOnTouch} 
            />
            <div className="nav-bar collapse-mobile">
                <NavItem to='/home' className='nav-item' activeClassName='nav-item--active'>
                    HOME
                </NavItem>
                <NavItem to='/product' className='nav-item' activeClassName='nav-item--active'>
                    PRODUCT
                </NavItem>
                <NavItem to='/' className='nav-item' activeClassName='nav-item--active'>
                    ABOUT US
                </NavItem>
            </div>
            <Drawer
                title=" " 
                placement="left" 
                closable={false} 
                onClose={handleCloseDrawer} 
                visible={isOnTouch}
                key={"left"}
                width={400}
                zIndex={99}
                bodyStyle={{ backgroundColor: "#ffd1bd" }}
                headerStyle={{ backgroundColor: "#ffd1bd", color: "#fff" }}
            >
                <NavItem onClose={handleCloseDrawer} to='/home' className='nav-item' activeClassName='nav-item--active'>
                    HOME
                </NavItem>
                <NavItem onClose={handleCloseDrawer} to='/product' className='nav-item' activeClassName='nav-item--active'>
                    PRODUCT
                </NavItem>
                <NavItem onClose={handleCloseDrawer} to='/' className='nav-item' activeClassName='nav-item--active'>
                    ABOUT US
                </NavItem>
            </Drawer>
        </div>
    );
}