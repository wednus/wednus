/**
 * \file instructions.js   Instructions for Creature class
 *
 * This file extends the Creature class with more instructions; the more
 * instructions, the smarter the creature is.
 * @note built-in commands:
 * - still: be still
 * - rturn/left/right/backward: turns
 * - hide: invisible
 */


/**
 * behavior definition for: hitting wall
 */
W.Creature.prototype.ifWall  = 'rturn';