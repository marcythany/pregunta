export const PERMISSION_THRESHOLDS = {
  CREATE_QUESTION: 100,
  EDIT_QUESTION: 500,
  DELETE_QUESTION: 1000,
  VOTE: 10,
  COMMENT: 50,
  CREATE_CATEGORY: 1000,
  MODERATE: 2000
};

export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user'
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: ['*'],
  [USER_ROLES.MODERATOR]: [
    'CREATE_QUESTION',
    'EDIT_QUESTION',
    'DELETE_QUESTION',
    'VOTE',
    'COMMENT',
    'MODERATE'
  ],
  [USER_ROLES.USER]: [
    'CREATE_QUESTION',
    'VOTE',
    'COMMENT'
  ]
};