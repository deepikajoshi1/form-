const UserDetails = async (userId) => {
  try {
    const response = await fetch(`/users/${userId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch user details');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

// Usage
const userId = '123456789'; // Replace with the actual user ID
UserDetails(userId)
  .then((user) => {
    // Handle user details
    console.log('User details:', user);
  })
  .catch((error) => {
    // Handle error
    console.error('Error fetching user details:', error);
  });
  export default UserDetails;
