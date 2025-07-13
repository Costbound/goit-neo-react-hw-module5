import { ClipLoader } from 'react-spinners'
import css from './Loader.module.css'


export default function Loader({isNotAbsolute}) {
    return (
        <div className={isNotAbsolute ?  css.loader : css.loaderCentred}>
            <ClipLoader color='#cc002c'/>
        </div>
    )
}