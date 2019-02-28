

using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Pets;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class PetService : IPetService
    {
        private IDataProvider _dataProvider;


        public PetService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public PetService()
        {
        }




        public void Update(PetUpdateRequest data, int userId)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");
            }

            string storedProc = "[dbo].[Pets_Update]";

            _dataProvider.ExecuteNonQuery(storedProc, delegate (SqlParameterCollection sqlParams)
            {
                sqlParams.AddWithValue("@Id", data.Id);
                sqlParams.AddWithValue("@UserId", userId);
                sqlParams.AddWithValue("@Name", data.Name);
                sqlParams.AddWithValue("@DOB", data.DOB);
                sqlParams.AddWithValue("@PrimaryPhotoUrl", data.PrimaryPhotoUrl);
                sqlParams.AddWithValue("@BreedId", data.BreedId);
                sqlParams.AddWithValue("@TotalPoints", data.TotalPoints);
                sqlParams.AddWithValue("@CurrentPoints", data.CurrentPoints);
                sqlParams.AddWithValue("@Weight", data.Weight);
                sqlParams.AddWithValue("@Appetite", data.Appetite);
            });
        }

        public int Add(PetAddRequest data, int userId)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");
            }

            int petId = 0;
            string storedProc = "[dbo].[Pets_Insert]";
            _dataProvider.ExecuteNonQuery(storedProc, inputParamMapper: delegate (SqlParameterCollection sqlParams)
            {

                sqlParams.AddWithValue("@Name", data.Name);
                sqlParams.AddWithValue("@UserId", userId);
                sqlParams.AddWithValue("@DOB", data.DOB);
                sqlParams.AddWithValue("@PrimaryPhotoUrl", data.PrimaryPhotoUrl.ToString());
                sqlParams.AddWithValue("@BreedId", data.BreedId);
                sqlParams.AddWithValue("@TotalPoints", data.TotalPoints);
                sqlParams.AddWithValue("@CurrentPoints", data.CurrentPoints);
                sqlParams.AddWithValue("@Weight", data.Weight);
                sqlParams.AddWithValue("@Appetite", data.Appetite);

                SqlParameter idParameter = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                idParameter.Direction = System.Data.ParameterDirection.Output;

                sqlParams.Add(idParameter);
            }
                , returnParameters: delegate (SqlParameterCollection sqlParams)
                {
                    Int32.TryParse(sqlParams["@Id"].Value.ToString(), out petId);
                }
                    );

            return petId;
        }
	}
	
    }