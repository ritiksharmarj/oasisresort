import supabase from './supabase';

/**
 * Sign up user
 * @returns user data
 */
export async function signUp({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: '',
      },
    },
  });

  if (error) {
    throw new Error('We are unable to create user at this time.');
  }

  return data;
}

/**
 * Log In With Email/Password
 * @returns user data
 */
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('Either email or password is incorrect.');
  }

  return data;
}

/**
 * Validate current user
 * @returns user data
 */
export async function getCurrentUser() {
  // Check if session exists for current user
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // If session exists, return user data
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

/**
 * Logout user
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

/**
 * Update user data
 * @returns user data
 */
export async function updateCurrentUser({ name, avatar, password }) {
  // 1. Update name or password
  let updateData;
  if (password) updateData = { password };
  if (name) updateData = { data: { name } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error('We are unable to update user at this time.');
  }

  if (!avatar || avatar.length === 0) return data;

  // 2. Upload the avatar image
  const avatarName = `avatar-${new Date().getTime()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(avatarName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user db
  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/avatars/${avatarName}`,
      },
    });

  if (avatarError) throw new Error(avatarError.message);

  return updatedUser;
}
