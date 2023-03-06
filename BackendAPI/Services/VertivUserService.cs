using Entities;
using RepositoryContracts;
using ServiceContracts;

namespace Services
{
    public class VertivUserService : IVertivUserService
    {
        private readonly IVertivUserRepository _repository;

        public VertivUserService(IVertivUserRepository repository)
        {
            _repository = repository;
        }

        public string GenerateOTP(string userID)
        {
            string otp = new Random().Next(999999).ToString();
            User newUser = new User()
            {
                UserID = userID,
                OTP = otp,
                OTPExpiration = DateTime.Now.AddSeconds(30)
            };

            User? storeUser = _repository.GetUser(userID);
            if (storeUser != null)
            {
                _repository.UpdateUser(newUser);
            }
            else
            {
                _repository.AddUser(newUser);
            }
            return otp;
        }

        public bool ValidateUser(string userID, string otp)
        {
            User? storeUser = _repository.GetUser(userID);
            if (storeUser != null)
            {
                if (DateTime.Now <= storeUser.OTPExpiration && storeUser.OTP == otp)
                {
                    return true;
                }
            }

            return false;
        }
    }
}