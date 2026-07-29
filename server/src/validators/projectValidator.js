const { z } = require('zod');

const createProjectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  architectureDetails: z.string().optional(),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  category: z.enum(['BACKEND', 'FULL_STACK', 'DEEP_LEARNING', 'OTHER']).default('BACKEND'),
  featured: z.boolean().default(false),
  imageUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  demoUrl: z.string().url().optional().or(z.literal('')),
  displayOrder: z.number().int().default(0)
});

const updateProjectSchema = createProjectSchema.partial();

module.exports = {
  createProjectSchema,
  updateProjectSchema
};
