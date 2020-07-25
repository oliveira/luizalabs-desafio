const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserRepository = require('../repositories/user')
const { ErrorHandler } = require('../middlewares/error-handler')

exports.authenticate = async function(email, password) {

    let user = await UserRepository.findByEmail(email)
    console.log('auth katiau')
    if (!user) {
      console.log('>>>não achou')
      throw new ErrorHandler(401, ['Authentication failed'])
    }

    const passwordHash = user.password
    console.log('11111111111')
    const match = await bcrypt.compare(password, passwordHash)
    console.log('22222222222')

    console.log('>>match:', match)

    if(match) {
      console.log('>>>process.env.JWT_SECRET', process.env.JWT_SECRET)
      let token = jwt.sign({ id: user._id},
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        )

        return {token: token}
    } else {
        throw new ErrorHandler(401, ['Authentication failed'])
    }
}
