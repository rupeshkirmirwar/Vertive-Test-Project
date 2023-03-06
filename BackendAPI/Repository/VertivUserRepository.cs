using Entities;
using RepositoryContracts;

namespace Repository
{
    public class VertivUserRepository:IVertivUserRepository
    {
        private readonly List<User> _store;

        public VertivUserRepository()
        {
            _store = new List<User>();
        }

        public void AddUser(User user)
        {
            _store.Add(user);
        }

        public User? GetUser(string userID)
        {
            return _store.FirstOrDefault(u => u.UserID == userID);
        }

        void IVertivUserRepository.UpdateUser(User user)
        {
            User? storeUser = _store.FirstOrDefault(u => u.UserID == user.UserID);
            if (storeUser != null)
            {
                storeUser.OTP = user.OTP;
                storeUser.OTPExpiration = user.OTPExpiration;
            }
        }
    }
}