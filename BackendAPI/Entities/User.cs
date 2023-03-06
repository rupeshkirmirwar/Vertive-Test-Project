namespace Entities
{
    public class User
    {
        public string UserID { get; set; } = string.Empty;
        public string OTP { get; set; } = string.Empty;
        public DateTime OTPExpiration { get; set; }
    }
}
