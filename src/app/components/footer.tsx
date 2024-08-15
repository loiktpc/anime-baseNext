import '../sass/Pagination.scss'
import Image from 'next/image'
import LogoFt from '../../../public/img/logo-footer.png'
import logofptleft from '../../../public/img/5EK1lFm.png'
function Footer() {
    let width = 50 ;
    let height = 50 ;
    return ( <>
    <div style={{width: "100%"}} className="py-8 px-1  flex justify-between footer">
        <div>
            <Image width="208" height="44" className="w-52 h-11" src={LogoFt}alt="" />
        </div>
        <div>
            <Image  src={logofptleft} alt="" />
        </div>
    </div>
    </> );
}

export default Footer;