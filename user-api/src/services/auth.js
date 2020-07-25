const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserRepository = require('../repositories/user')
const { ErrorHandler } = require('../middlewares/error-handler')

exports.authenticate = async (email, password) => {
  const user = await UserRepository.findByEmail(email)

  if (!user) {
    throw new ErrorHandler(401, ['Authentication failed'])
  }

  const passwordHash = user.password
  const match = await bcrypt.compare(password, passwordHash)

  if (match) {
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )

    user.token = token

    return user
  }

  throw new ErrorHandler(401, ['Authentication failed'])
}
