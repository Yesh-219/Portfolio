const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const ApiError = require('../utils/apiError');
const logger = require('../config/logger');

class AuthService {
  generateAccessToken(user) {
    const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_yeswanth_portfolio_2026';
    const expiresIn = process.env.JWT_EXPIRES_IN || '15m';
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn });
  }

  generateRefreshToken(user) {
    const secret = process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_token_key_2026';
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
    return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn });
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      logger.warn(`Failed login attempt for email: ${email}`);
      throw new ApiError(401, 'Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      logger.warn(`Invalid password for email: ${email}`);
      throw new ApiError(401, 'Invalid email or password');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Save refresh token with 7-day expiration
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await userRepository.saveRefreshToken(user.id, refreshToken, expiresAt);

    logger.info(`User authenticated successfully: ${user.email}`);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new ApiError(401, 'Refresh token required');
    }

    const secret = process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_token_key_2026';
    try {
      const decoded = jwt.verify(refreshToken, secret);
      const tokenRecord = await userRepository.findRefreshToken(refreshToken);

      if (tokenRecord && tokenRecord.revoked) {
        throw new ApiError(403, 'Refresh token has been revoked');
      }

      const user = await userRepository.findByEmail(decoded.email);
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      const newAccessToken = this.generateAccessToken(user);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new ApiError(403, 'Invalid or expired refresh token');
    }
  }

  async logout(refreshToken) {
    if (refreshToken) {
      await userRepository.revokeRefreshToken(refreshToken);
    }
    return true;
  }
}

module.exports = new AuthService();
