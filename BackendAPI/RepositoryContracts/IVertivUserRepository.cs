using Entities;

namespace RepositoryContracts
{
    public interface IVertivUserRepository
    {
        public void AddUser(User user);
        public User? GetUser(string userID);
        public void UpdateUser(User user);
    }
}