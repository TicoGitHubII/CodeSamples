USE [C65]
GO
/****** Object:  StoredProcedure [dbo].[Pets_Pagination]    Script Date: 2/28/2019 11:10:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER  proc [dbo].[Pets_Pagination]
        
		 @PageSize int 
		 ,@PageIndex int
		 ,@TotalPoints int = null
		 ,@CurrentPoints int = null


/*

		Declare 
		,@PageSize int = 3
		,@PageIndex int = 0

		Exec dbo.Pets_Pagination
		 @PageIndex
		,@PageSize

		SELECT * 
		FROM dbo.Pets

*/

		as

		BEGIN
		        SELECT 
				   [Id]
				   ,[UserId]
				  ,[DateCreated]
				  ,[DateModified]
				  ,[Name]
				  ,[DOB]
				  ,[PrimaryPhotoUrl]
				  ,[BreedId]
				  ,[TotalPoints]
				  ,[CurrentPoints]
				  ,[Weight]
				  ,[Appetite]
				  ,Total = COUNT(1) OVER()

		

				FROM dbo.Pets
				WHERE TotalPoints = ISNULL(@TotalPoints, TotalPoints) AND
				      CurrentPoints = ISNULL(@CurrentPoints,CurrentPoints)
				ORDER BY  
					[Name] Desc

				OFFSET 
					(@PageIndex) * @PageSize ROWS

				FETCH NEXT @PageSize ROWS ONLY;
             



		END



