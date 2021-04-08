import NavItem from './NavItem';

export default function Header(){
    return (
        <div className="header">
            <img alt="" className="header-icon" src="###" />
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
    );
}