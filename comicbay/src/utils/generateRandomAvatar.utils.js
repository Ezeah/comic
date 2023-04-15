const avatarStyles = require( './avatarStyles.utils' );

const generateRandomStyle = () => {
    const randomindex = math.floor( math.random() * avatarStyles.length );
    return avatarStyles[ randomindex ];
};

const generateRandomAvatar = async ( email ) => {
    const emailRegex = /^[^\s@]+[^\s@]+\.[^\s@]+$/;
    const _email = email.trim();
const isValidEmail = emailRegex.test( _email );
if( !isValidEmail ) { throw new Error( 'Invalid email' ); }
const entropySource = () => math.random().toString( 36 ).substring( 2, 7 );
const replaceAt = `-${ entropySource() }-`;
const replaceDot = `-${ entropySource() }-`;
const seed = _email.replace( '@', replaceAt ).replace( /\./g, replaceDot );
const randomAvatarStyle = getRandomAvatarStyle();
if( !randomAvatarStyle || !avatarStyles.includes( randomAvatarStyle ) ) { throw new Error( 'something failed')}
const avatarUrl = `https://api.dicebear.com/5.x/${ randomAvatarStyle }/svg?seed=${ seed }&size=200&radius=50`;
return avatarUrl;
};

module.exports = generateRandomAvatar;

