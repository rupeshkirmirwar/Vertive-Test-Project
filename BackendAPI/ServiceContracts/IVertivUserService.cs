using Entities;
using System.Reflection.Metadata;

namespace ServiceContracts
{
    public interface IVertivUserService
    {
        public string GenerateOTP(string userID);
        public bool ValidateUser(string userID, string otp);

    }
}