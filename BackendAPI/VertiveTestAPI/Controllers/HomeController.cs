using Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts;

namespace VertiveTestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IVertivUserService _service;

        public HomeController(IVertivUserService service)
        {
            _service = service;
        }

        [HttpGet("GenerateOTP")]
        public ActionResult<string> GenerateOTP(string userID)
        {
            if(string.IsNullOrEmpty(userID))
            {
                return BadRequest("UserID can not be empty");
            }
            return _service.GenerateOTP(userID);
        }

        [HttpPost("ValidateUser")]
        public ActionResult<bool> ValidateUser(string userID, string otp) 
        {
            if(string.IsNullOrEmpty(userID) || string.IsNullOrEmpty(otp))
            {
                return BadRequest("UserID or OTP can not be empty");
            }
            return _service.ValidateUser(userID, otp);
        }
    }
}
