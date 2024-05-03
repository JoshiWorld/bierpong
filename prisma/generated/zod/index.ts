import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TournamentScalarFieldEnumSchema = z.enum(['id','name','code','password','createdAt','updatedAt','tournamentSize','tournamentState']);

export const TeamScalarFieldEnumSchema = z.enum(['id','name','code','createdAt','updatedAt','tournamentId','groupId']);

export const PlayerScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','teamId']);

export const GroupScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','tournamentId']);

export const MatchScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','team1Id','team2Id','winnerId','looserId','tournamentId','team1Score','team2Score']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const TournamentSizeSchema = z.enum(['SMALL','MEDIUM','LARGE','BIG']);

export type TournamentSizeType = `${z.infer<typeof TournamentSizeSchema>}`

export const TournamentStateSchema = z.enum(['LOBBY','RUNNING','FINISHED']);

export type TournamentStateType = `${z.infer<typeof TournamentStateSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TOURNAMENT SCHEMA
/////////////////////////////////////////

export const TournamentSchema = z.object({
  tournamentSize: TournamentSizeSchema,
  tournamentState: TournamentStateSchema,
  id: z.string(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Tournament = z.infer<typeof TournamentSchema>

// TOURNAMENT RELATION SCHEMA
//------------------------------------------------------

export type TournamentRelations = {
  teams: Team[];
  matches: Match[];
  groups: Group[];
};

export type TournamentWithRelations = z.infer<typeof TournamentSchema> & TournamentRelations

export const TournamentWithRelationsSchema: z.ZodType<TournamentWithRelations> = TournamentSchema.merge(z.object({
  teams: z.lazy(() => TeamSchema).array(),
  matches: z.lazy(() => MatchSchema).array(),
  groups: z.lazy(() => GroupSchema).array(),
}))

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  tournamentId: z.string(),
  groupId: z.string().nullable(),
})

export type Team = z.infer<typeof TeamSchema>

// TEAM RELATION SCHEMA
//------------------------------------------------------

export type TeamRelations = {
  players: Player[];
  tournament: Tournament;
  team1Matches: Match[];
  team2Matches: Match[];
  winnerMatches: Match[];
  looserMatches: Match[];
  group?: Group | null;
};

export type TeamWithRelations = z.infer<typeof TeamSchema> & TeamRelations

export const TeamWithRelationsSchema: z.ZodType<TeamWithRelations> = TeamSchema.merge(z.object({
  players: z.lazy(() => PlayerSchema).array(),
  tournament: z.lazy(() => TournamentSchema),
  team1Matches: z.lazy(() => MatchSchema).array(),
  team2Matches: z.lazy(() => MatchSchema).array(),
  winnerMatches: z.lazy(() => MatchSchema).array(),
  looserMatches: z.lazy(() => MatchSchema).array(),
  group: z.lazy(() => GroupSchema).nullable(),
}))

/////////////////////////////////////////
// PLAYER SCHEMA
/////////////////////////////////////////

export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  teamId: z.string(),
})

export type Player = z.infer<typeof PlayerSchema>

// PLAYER RELATION SCHEMA
//------------------------------------------------------

export type PlayerRelations = {
  team: Team;
};

export type PlayerWithRelations = z.infer<typeof PlayerSchema> & PlayerRelations

export const PlayerWithRelationsSchema: z.ZodType<PlayerWithRelations> = PlayerSchema.merge(z.object({
  team: z.lazy(() => TeamSchema),
}))

/////////////////////////////////////////
// GROUP SCHEMA
/////////////////////////////////////////

export const GroupSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  tournamentId: z.string(),
})

export type Group = z.infer<typeof GroupSchema>

// GROUP RELATION SCHEMA
//------------------------------------------------------

export type GroupRelations = {
  tournament: Tournament;
  teams: Team[];
};

export type GroupWithRelations = z.infer<typeof GroupSchema> & GroupRelations

export const GroupWithRelationsSchema: z.ZodType<GroupWithRelations> = GroupSchema.merge(z.object({
  tournament: z.lazy(() => TournamentSchema),
  teams: z.lazy(() => TeamSchema).array(),
}))

/////////////////////////////////////////
// MATCH SCHEMA
/////////////////////////////////////////

export const MatchSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  team1Id: z.string(),
  team2Id: z.string(),
  winnerId: z.string().nullable(),
  looserId: z.string().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int(),
})

export type Match = z.infer<typeof MatchSchema>

// MATCH RELATION SCHEMA
//------------------------------------------------------

export type MatchRelations = {
  team1: Team;
  team2: Team;
  winner?: Team | null;
  looser?: Team | null;
  tournament: Tournament;
};

export type MatchWithRelations = z.infer<typeof MatchSchema> & MatchRelations

export const MatchWithRelationsSchema: z.ZodType<MatchWithRelations> = MatchSchema.merge(z.object({
  team1: z.lazy(() => TeamSchema),
  team2: z.lazy(() => TeamSchema),
  winner: z.lazy(() => TeamSchema).nullable(),
  looser: z.lazy(() => TeamSchema).nullable(),
  tournament: z.lazy(() => TournamentSchema),
}))

/////////////////////////////////////////
// MONGODB TYPES
/////////////////////////////////////////

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TOURNAMENT
//------------------------------------------------------

export const TournamentIncludeSchema: z.ZodType<Prisma.TournamentInclude> = z.object({
}).strict()

export const TournamentArgsSchema: z.ZodType<Prisma.TournamentDefaultArgs> = z.object({
  select: z.lazy(() => TournamentSelectSchema).optional(),
  include: z.lazy(() => TournamentIncludeSchema).optional(),
}).strict();

export const TournamentCountOutputTypeArgsSchema: z.ZodType<Prisma.TournamentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TournamentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TournamentCountOutputTypeSelectSchema: z.ZodType<Prisma.TournamentCountOutputTypeSelect> = z.object({
  teams: z.boolean().optional(),
  matches: z.boolean().optional(),
  groups: z.boolean().optional(),
}).strict();

export const TournamentSelectSchema: z.ZodType<Prisma.TournamentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  code: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tournamentSize: z.boolean().optional(),
  tournamentState: z.boolean().optional(),
  teams: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  matches: z.union([z.boolean(),z.lazy(() => MatchArgsSchema)]).optional(),
  groups: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TournamentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TEAM
//------------------------------------------------------

export const TeamIncludeSchema: z.ZodType<Prisma.TeamInclude> = z.object({
}).strict()

export const TeamArgsSchema: z.ZodType<Prisma.TeamDefaultArgs> = z.object({
  select: z.lazy(() => TeamSelectSchema).optional(),
  include: z.lazy(() => TeamIncludeSchema).optional(),
}).strict();

export const TeamCountOutputTypeArgsSchema: z.ZodType<Prisma.TeamCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TeamCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TeamCountOutputTypeSelectSchema: z.ZodType<Prisma.TeamCountOutputTypeSelect> = z.object({
  players: z.boolean().optional(),
  team1Matches: z.boolean().optional(),
  team2Matches: z.boolean().optional(),
  winnerMatches: z.boolean().optional(),
  looserMatches: z.boolean().optional(),
}).strict();

export const TeamSelectSchema: z.ZodType<Prisma.TeamSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  code: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tournamentId: z.boolean().optional(),
  groupId: z.boolean().optional(),
  players: z.union([z.boolean(),z.lazy(() => PlayerArgsSchema)]).optional(),
  tournament: z.union([z.boolean(),z.lazy(() => TournamentArgsSchema)]).optional(),
  team1Matches: z.union([z.boolean(),z.lazy(() => MatchArgsSchema)]).optional(),
  team2Matches: z.union([z.boolean(),z.lazy(() => MatchArgsSchema)]).optional(),
  winnerMatches: z.union([z.boolean(),z.lazy(() => MatchArgsSchema)]).optional(),
  looserMatches: z.union([z.boolean(),z.lazy(() => MatchArgsSchema)]).optional(),
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TeamCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PLAYER
//------------------------------------------------------

export const PlayerIncludeSchema: z.ZodType<Prisma.PlayerInclude> = z.object({
}).strict()

export const PlayerArgsSchema: z.ZodType<Prisma.PlayerDefaultArgs> = z.object({
  select: z.lazy(() => PlayerSelectSchema).optional(),
  include: z.lazy(() => PlayerIncludeSchema).optional(),
}).strict();

export const PlayerSelectSchema: z.ZodType<Prisma.PlayerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  teamId: z.boolean().optional(),
  team: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
}).strict()

// GROUP
//------------------------------------------------------

export const GroupIncludeSchema: z.ZodType<Prisma.GroupInclude> = z.object({
}).strict()

export const GroupArgsSchema: z.ZodType<Prisma.GroupDefaultArgs> = z.object({
  select: z.lazy(() => GroupSelectSchema).optional(),
  include: z.lazy(() => GroupIncludeSchema).optional(),
}).strict();

export const GroupCountOutputTypeArgsSchema: z.ZodType<Prisma.GroupCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GroupCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GroupCountOutputTypeSelectSchema: z.ZodType<Prisma.GroupCountOutputTypeSelect> = z.object({
  teams: z.boolean().optional(),
}).strict();

export const GroupSelectSchema: z.ZodType<Prisma.GroupSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tournamentId: z.boolean().optional(),
  tournament: z.union([z.boolean(),z.lazy(() => TournamentArgsSchema)]).optional(),
  teams: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GroupCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MATCH
//------------------------------------------------------

export const MatchIncludeSchema: z.ZodType<Prisma.MatchInclude> = z.object({
}).strict()

export const MatchArgsSchema: z.ZodType<Prisma.MatchDefaultArgs> = z.object({
  select: z.lazy(() => MatchSelectSchema).optional(),
  include: z.lazy(() => MatchIncludeSchema).optional(),
}).strict();

export const MatchSelectSchema: z.ZodType<Prisma.MatchSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  team1Id: z.boolean().optional(),
  team2Id: z.boolean().optional(),
  winnerId: z.boolean().optional(),
  looserId: z.boolean().optional(),
  tournamentId: z.boolean().optional(),
  team1Score: z.boolean().optional(),
  team2Score: z.boolean().optional(),
  team1: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  team2: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  winner: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  looser: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  tournament: z.union([z.boolean(),z.lazy(() => TournamentArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TournamentWhereInputSchema: z.ZodType<Prisma.TournamentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TournamentWhereInputSchema),z.lazy(() => TournamentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TournamentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TournamentWhereInputSchema),z.lazy(() => TournamentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournamentSize: z.union([ z.lazy(() => EnumTournamentSizeFilterSchema),z.lazy(() => TournamentSizeSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => EnumTournamentStateFilterSchema),z.lazy(() => TournamentStateSchema) ]).optional(),
  teams: z.lazy(() => TeamListRelationFilterSchema).optional(),
  matches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  groups: z.lazy(() => GroupListRelationFilterSchema).optional()
}).strict();

export const TournamentOrderByWithRelationInputSchema: z.ZodType<Prisma.TournamentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentSize: z.lazy(() => SortOrderSchema).optional(),
  tournamentState: z.lazy(() => SortOrderSchema).optional(),
  teams: z.lazy(() => TeamOrderByRelationAggregateInputSchema).optional(),
  matches: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional(),
  groups: z.lazy(() => GroupOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TournamentWhereUniqueInputSchema: z.ZodType<Prisma.TournamentWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    code: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    code: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  code: z.string().optional(),
  AND: z.union([ z.lazy(() => TournamentWhereInputSchema),z.lazy(() => TournamentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TournamentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TournamentWhereInputSchema),z.lazy(() => TournamentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournamentSize: z.union([ z.lazy(() => EnumTournamentSizeFilterSchema),z.lazy(() => TournamentSizeSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => EnumTournamentStateFilterSchema),z.lazy(() => TournamentStateSchema) ]).optional(),
  teams: z.lazy(() => TeamListRelationFilterSchema).optional(),
  matches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  groups: z.lazy(() => GroupListRelationFilterSchema).optional()
}).strict());

export const TournamentOrderByWithAggregationInputSchema: z.ZodType<Prisma.TournamentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentSize: z.lazy(() => SortOrderSchema).optional(),
  tournamentState: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TournamentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TournamentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TournamentMinOrderByAggregateInputSchema).optional()
}).strict();

export const TournamentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TournamentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TournamentScalarWhereWithAggregatesInputSchema),z.lazy(() => TournamentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TournamentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TournamentScalarWhereWithAggregatesInputSchema),z.lazy(() => TournamentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  tournamentSize: z.union([ z.lazy(() => EnumTournamentSizeWithAggregatesFilterSchema),z.lazy(() => TournamentSizeSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => EnumTournamentStateWithAggregatesFilterSchema),z.lazy(() => TournamentStateSchema) ]).optional(),
}).strict();

export const TeamWhereInputSchema: z.ZodType<Prisma.TeamWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  players: z.lazy(() => PlayerListRelationFilterSchema).optional(),
  tournament: z.union([ z.lazy(() => TournamentRelationFilterSchema),z.lazy(() => TournamentWhereInputSchema) ]).optional(),
  team1Matches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  team2Matches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  winnerMatches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  looserMatches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  group: z.union([ z.lazy(() => GroupNullableRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TeamOrderByWithRelationInputSchema: z.ZodType<Prisma.TeamOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  players: z.lazy(() => PlayerOrderByRelationAggregateInputSchema).optional(),
  tournament: z.lazy(() => TournamentOrderByWithRelationInputSchema).optional(),
  team1Matches: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional(),
  team2Matches: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional(),
  looserMatches: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional(),
  group: z.lazy(() => GroupOrderByWithRelationInputSchema).optional()
}).strict();

export const TeamWhereUniqueInputSchema: z.ZodType<Prisma.TeamWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string(),
    code: z.string()
  }),
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  z.object({
    id: z.string(),
    code: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
    code: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    code: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  code: z.string().optional(),
  AND: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  players: z.lazy(() => PlayerListRelationFilterSchema).optional(),
  tournament: z.union([ z.lazy(() => TournamentRelationFilterSchema),z.lazy(() => TournamentWhereInputSchema) ]).optional(),
  team1Matches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  team2Matches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  winnerMatches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  looserMatches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  group: z.union([ z.lazy(() => GroupNullableRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional().nullable(),
}).strict());

export const TeamOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeamOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TeamCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TeamMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TeamMinOrderByAggregateInputSchema).optional()
}).strict();

export const TeamScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeamScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PlayerWhereInputSchema: z.ZodType<Prisma.PlayerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team: z.union([ z.lazy(() => TeamRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional(),
}).strict();

export const PlayerOrderByWithRelationInputSchema: z.ZodType<Prisma.PlayerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  team: z.lazy(() => TeamOrderByWithRelationInputSchema).optional()
}).strict();

export const PlayerWhereUniqueInputSchema: z.ZodType<Prisma.PlayerWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team: z.union([ z.lazy(() => TeamRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional(),
}).strict());

export const PlayerOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlayerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PlayerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PlayerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PlayerMinOrderByAggregateInputSchema).optional()
}).strict();

export const PlayerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlayerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema),z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema),z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  teamId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const GroupWhereInputSchema: z.ZodType<Prisma.GroupWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GroupWhereInputSchema),z.lazy(() => GroupWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupWhereInputSchema),z.lazy(() => GroupWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tournament: z.union([ z.lazy(() => TournamentRelationFilterSchema),z.lazy(() => TournamentWhereInputSchema) ]).optional(),
  teams: z.lazy(() => TeamListRelationFilterSchema).optional()
}).strict();

export const GroupOrderByWithRelationInputSchema: z.ZodType<Prisma.GroupOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  tournament: z.lazy(() => TournamentOrderByWithRelationInputSchema).optional(),
  teams: z.lazy(() => TeamOrderByRelationAggregateInputSchema).optional()
}).strict();

export const GroupWhereUniqueInputSchema: z.ZodType<Prisma.GroupWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => GroupWhereInputSchema),z.lazy(() => GroupWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupWhereInputSchema),z.lazy(() => GroupWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tournament: z.union([ z.lazy(() => TournamentRelationFilterSchema),z.lazy(() => TournamentWhereInputSchema) ]).optional(),
  teams: z.lazy(() => TeamListRelationFilterSchema).optional()
}).strict());

export const GroupOrderByWithAggregationInputSchema: z.ZodType<Prisma.GroupOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GroupCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GroupMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GroupMinOrderByAggregateInputSchema).optional()
}).strict();

export const GroupScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GroupScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GroupScalarWhereWithAggregatesInputSchema),z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupScalarWhereWithAggregatesInputSchema),z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MatchWhereInputSchema: z.ZodType<Prisma.MatchWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  team1Id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team2Id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  winnerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  looserId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team1Score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  team2Score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  team1: z.union([ z.lazy(() => TeamRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  team2: z.union([ z.lazy(() => TeamRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  winner: z.union([ z.lazy(() => TeamNullableRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  looser: z.union([ z.lazy(() => TeamNullableRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  tournament: z.union([ z.lazy(() => TournamentRelationFilterSchema),z.lazy(() => TournamentWhereInputSchema) ]).optional(),
}).strict();

export const MatchOrderByWithRelationInputSchema: z.ZodType<Prisma.MatchOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  team1Id: z.lazy(() => SortOrderSchema).optional(),
  team2Id: z.lazy(() => SortOrderSchema).optional(),
  winnerId: z.lazy(() => SortOrderSchema).optional(),
  looserId: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  team1Score: z.lazy(() => SortOrderSchema).optional(),
  team2Score: z.lazy(() => SortOrderSchema).optional(),
  team1: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
  team2: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
  winner: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
  looser: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
  tournament: z.lazy(() => TournamentOrderByWithRelationInputSchema).optional()
}).strict();

export const MatchWhereUniqueInputSchema: z.ZodType<Prisma.MatchWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  team1Id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team2Id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  winnerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  looserId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team1Score: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  team2Score: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  team1: z.union([ z.lazy(() => TeamRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  team2: z.union([ z.lazy(() => TeamRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  winner: z.union([ z.lazy(() => TeamNullableRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  looser: z.union([ z.lazy(() => TeamNullableRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  tournament: z.union([ z.lazy(() => TournamentRelationFilterSchema),z.lazy(() => TournamentWhereInputSchema) ]).optional(),
}).strict());

export const MatchOrderByWithAggregationInputSchema: z.ZodType<Prisma.MatchOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  team1Id: z.lazy(() => SortOrderSchema).optional(),
  team2Id: z.lazy(() => SortOrderSchema).optional(),
  winnerId: z.lazy(() => SortOrderSchema).optional(),
  looserId: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  team1Score: z.lazy(() => SortOrderSchema).optional(),
  team2Score: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MatchCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MatchAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MatchMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MatchMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MatchSumOrderByAggregateInputSchema).optional()
}).strict();

export const MatchScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MatchScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MatchScalarWhereWithAggregatesInputSchema),z.lazy(() => MatchScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchScalarWhereWithAggregatesInputSchema),z.lazy(() => MatchScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  team1Id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  team2Id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  winnerId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  looserId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  tournamentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  team1Score: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  team2Score: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TournamentCreateInputSchema: z.ZodType<Prisma.TournamentCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentSize: z.lazy(() => TournamentSizeSchema).optional(),
  tournamentState: z.lazy(() => TournamentStateSchema).optional(),
  teams: z.lazy(() => TeamCreateNestedManyWithoutTournamentInputSchema).optional(),
  matches: z.lazy(() => MatchCreateNestedManyWithoutTournamentInputSchema).optional(),
  groups: z.lazy(() => GroupCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentUncheckedCreateInputSchema: z.ZodType<Prisma.TournamentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentSize: z.lazy(() => TournamentSizeSchema).optional(),
  tournamentState: z.lazy(() => TournamentStateSchema).optional(),
  teams: z.lazy(() => TeamUncheckedCreateNestedManyWithoutTournamentInputSchema).optional(),
  matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTournamentInputSchema).optional(),
  groups: z.lazy(() => GroupUncheckedCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentUpdateInputSchema: z.ZodType<Prisma.TournamentUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentSize: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => EnumTournamentSizeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => EnumTournamentStateFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUpdateManyWithoutTournamentNestedInputSchema).optional(),
  matches: z.lazy(() => MatchUpdateManyWithoutTournamentNestedInputSchema).optional(),
  groups: z.lazy(() => GroupUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentUncheckedUpdateInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentSize: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => EnumTournamentSizeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => EnumTournamentStateFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional(),
  matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional(),
  groups: z.lazy(() => GroupUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentCreateManyInputSchema: z.ZodType<Prisma.TournamentCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentSize: z.lazy(() => TournamentSizeSchema).optional(),
  tournamentState: z.lazy(() => TournamentStateSchema).optional()
}).strict();

export const TournamentUpdateManyMutationInputSchema: z.ZodType<Prisma.TournamentUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentSize: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => EnumTournamentSizeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => EnumTournamentStateFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TournamentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentSize: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => EnumTournamentSizeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => EnumTournamentStateFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamCreateInputSchema: z.ZodType<Prisma.TeamCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutTeamsInputSchema),
  team1Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchCreateNestedManyWithoutLooserInputSchema).optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUncheckedCreateInputSchema: z.ZodType<Prisma.TeamUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string(),
  groupId: z.string().optional().nullable(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutLooserInputSchema).optional()
}).strict();

export const TeamUpdateInputSchema: z.ZodType<Prisma.TeamUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUpdateManyWithoutLooserNestedInputSchema).optional(),
  group: z.lazy(() => GroupUpdateOneWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutLooserNestedInputSchema).optional()
}).strict();

export const TeamCreateManyInputSchema: z.ZodType<Prisma.TeamCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string(),
  groupId: z.string().optional().nullable()
}).strict();

export const TeamUpdateManyMutationInputSchema: z.ZodType<Prisma.TeamUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PlayerCreateInputSchema: z.ZodType<Prisma.PlayerCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutPlayersInputSchema)
}).strict();

export const PlayerUncheckedCreateInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teamId: z.string()
}).strict();

export const PlayerUpdateInputSchema: z.ZodType<Prisma.PlayerUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team: z.lazy(() => TeamUpdateOneRequiredWithoutPlayersNestedInputSchema).optional()
}).strict();

export const PlayerUncheckedUpdateInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerCreateManyInputSchema: z.ZodType<Prisma.PlayerCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teamId: z.string()
}).strict();

export const PlayerUpdateManyMutationInputSchema: z.ZodType<Prisma.PlayerUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GroupCreateInputSchema: z.ZodType<Prisma.GroupCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutGroupsInputSchema),
  teams: z.lazy(() => TeamCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUncheckedCreateInputSchema: z.ZodType<Prisma.GroupUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string(),
  teams: z.lazy(() => TeamUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUpdateInputSchema: z.ZodType<Prisma.GroupUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutGroupsNestedInputSchema).optional(),
  teams: z.lazy(() => TeamUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupCreateManyInputSchema: z.ZodType<Prisma.GroupCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string()
}).strict();

export const GroupUpdateManyMutationInputSchema: z.ZodType<Prisma.GroupUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GroupUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateManyInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchCreateInputSchema: z.ZodType<Prisma.MatchCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Score: z.number().int(),
  team2Score: z.number().int(),
  team1: z.lazy(() => TeamCreateNestedOneWithoutTeam1MatchesInputSchema),
  team2: z.lazy(() => TeamCreateNestedOneWithoutTeam2MatchesInputSchema),
  winner: z.lazy(() => TeamCreateNestedOneWithoutWinnerMatchesInputSchema).optional(),
  looser: z.lazy(() => TeamCreateNestedOneWithoutLooserMatchesInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutMatchesInputSchema)
}).strict();

export const MatchUncheckedCreateInputSchema: z.ZodType<Prisma.MatchUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Id: z.string(),
  team2Id: z.string(),
  winnerId: z.string().optional().nullable(),
  looserId: z.string().optional().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const MatchUpdateInputSchema: z.ZodType<Prisma.MatchUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team1: z.lazy(() => TeamUpdateOneRequiredWithoutTeam1MatchesNestedInputSchema).optional(),
  team2: z.lazy(() => TeamUpdateOneRequiredWithoutTeam2MatchesNestedInputSchema).optional(),
  winner: z.lazy(() => TeamUpdateOneWithoutWinnerMatchesNestedInputSchema).optional(),
  looser: z.lazy(() => TeamUpdateOneWithoutLooserMatchesNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutMatchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team2Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  looserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchCreateManyInputSchema: z.ZodType<Prisma.MatchCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Id: z.string(),
  team2Id: z.string(),
  winnerId: z.string().optional().nullable(),
  looserId: z.string().optional().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const MatchUpdateManyMutationInputSchema: z.ZodType<Prisma.MatchUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team2Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  looserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const EnumTournamentSizeFilterSchema: z.ZodType<Prisma.EnumTournamentSizeFilter> = z.object({
  equals: z.lazy(() => TournamentSizeSchema).optional(),
  in: z.lazy(() => TournamentSizeSchema).array().optional(),
  notIn: z.lazy(() => TournamentSizeSchema).array().optional(),
  not: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => NestedEnumTournamentSizeFilterSchema) ]).optional(),
}).strict();

export const EnumTournamentStateFilterSchema: z.ZodType<Prisma.EnumTournamentStateFilter> = z.object({
  equals: z.lazy(() => TournamentStateSchema).optional(),
  in: z.lazy(() => TournamentStateSchema).array().optional(),
  notIn: z.lazy(() => TournamentStateSchema).array().optional(),
  not: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => NestedEnumTournamentStateFilterSchema) ]).optional(),
}).strict();

export const TeamListRelationFilterSchema: z.ZodType<Prisma.TeamListRelationFilter> = z.object({
  every: z.lazy(() => TeamWhereInputSchema).optional(),
  some: z.lazy(() => TeamWhereInputSchema).optional(),
  none: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const MatchListRelationFilterSchema: z.ZodType<Prisma.MatchListRelationFilter> = z.object({
  every: z.lazy(() => MatchWhereInputSchema).optional(),
  some: z.lazy(() => MatchWhereInputSchema).optional(),
  none: z.lazy(() => MatchWhereInputSchema).optional()
}).strict();

export const GroupListRelationFilterSchema: z.ZodType<Prisma.GroupListRelationFilter> = z.object({
  every: z.lazy(() => GroupWhereInputSchema).optional(),
  some: z.lazy(() => GroupWhereInputSchema).optional(),
  none: z.lazy(() => GroupWhereInputSchema).optional()
}).strict();

export const TeamOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TeamOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MatchOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GroupOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TournamentCountOrderByAggregateInputSchema: z.ZodType<Prisma.TournamentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentSize: z.lazy(() => SortOrderSchema).optional(),
  tournamentState: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TournamentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TournamentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentSize: z.lazy(() => SortOrderSchema).optional(),
  tournamentState: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TournamentMinOrderByAggregateInputSchema: z.ZodType<Prisma.TournamentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentSize: z.lazy(() => SortOrderSchema).optional(),
  tournamentState: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumTournamentSizeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTournamentSizeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TournamentSizeSchema).optional(),
  in: z.lazy(() => TournamentSizeSchema).array().optional(),
  notIn: z.lazy(() => TournamentSizeSchema).array().optional(),
  not: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => NestedEnumTournamentSizeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTournamentSizeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTournamentSizeFilterSchema).optional()
}).strict();

export const EnumTournamentStateWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTournamentStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TournamentStateSchema).optional(),
  in: z.lazy(() => TournamentStateSchema).array().optional(),
  notIn: z.lazy(() => TournamentStateSchema).array().optional(),
  not: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => NestedEnumTournamentStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTournamentStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTournamentStateFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const PlayerListRelationFilterSchema: z.ZodType<Prisma.PlayerListRelationFilter> = z.object({
  every: z.lazy(() => PlayerWhereInputSchema).optional(),
  some: z.lazy(() => PlayerWhereInputSchema).optional(),
  none: z.lazy(() => PlayerWhereInputSchema).optional()
}).strict();

export const TournamentRelationFilterSchema: z.ZodType<Prisma.TournamentRelationFilter> = z.object({
  is: z.lazy(() => TournamentWhereInputSchema).optional(),
  isNot: z.lazy(() => TournamentWhereInputSchema).optional()
}).strict();

export const GroupNullableRelationFilterSchema: z.ZodType<Prisma.GroupNullableRelationFilter> = z.object({
  is: z.lazy(() => GroupWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => GroupWhereInputSchema).optional().nullable()
}).strict();

export const PlayerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PlayerOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeamCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const TeamRelationFilterSchema: z.ZodType<Prisma.TeamRelationFilter> = z.object({
  is: z.lazy(() => TeamWhereInputSchema).optional(),
  isNot: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const PlayerCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupCountOrderByAggregateInputSchema: z.ZodType<Prisma.GroupCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GroupMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupMinOrderByAggregateInputSchema: z.ZodType<Prisma.GroupMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const TeamNullableRelationFilterSchema: z.ZodType<Prisma.TeamNullableRelationFilter> = z.object({
  is: z.lazy(() => TeamWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TeamWhereInputSchema).optional().nullable()
}).strict();

export const MatchCountOrderByAggregateInputSchema: z.ZodType<Prisma.MatchCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  team1Id: z.lazy(() => SortOrderSchema).optional(),
  team2Id: z.lazy(() => SortOrderSchema).optional(),
  winnerId: z.lazy(() => SortOrderSchema).optional(),
  looserId: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  team1Score: z.lazy(() => SortOrderSchema).optional(),
  team2Score: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MatchAvgOrderByAggregateInput> = z.object({
  team1Score: z.lazy(() => SortOrderSchema).optional(),
  team2Score: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MatchMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  team1Id: z.lazy(() => SortOrderSchema).optional(),
  team2Id: z.lazy(() => SortOrderSchema).optional(),
  winnerId: z.lazy(() => SortOrderSchema).optional(),
  looserId: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  team1Score: z.lazy(() => SortOrderSchema).optional(),
  team2Score: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchMinOrderByAggregateInputSchema: z.ZodType<Prisma.MatchMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  team1Id: z.lazy(() => SortOrderSchema).optional(),
  team2Id: z.lazy(() => SortOrderSchema).optional(),
  winnerId: z.lazy(() => SortOrderSchema).optional(),
  looserId: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  team1Score: z.lazy(() => SortOrderSchema).optional(),
  team2Score: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchSumOrderByAggregateInputSchema: z.ZodType<Prisma.MatchSumOrderByAggregateInput> = z.object({
  team1Score: z.lazy(() => SortOrderSchema).optional(),
  team2Score: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const TeamCreateNestedManyWithoutTournamentInputSchema: z.ZodType<Prisma.TeamCreateNestedManyWithoutTournamentInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutTournamentInputSchema),z.lazy(() => TeamCreateWithoutTournamentInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => TeamCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyTournamentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchCreateNestedManyWithoutTournamentInputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutTournamentInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTournamentInputSchema),z.lazy(() => MatchCreateWithoutTournamentInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTournamentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GroupCreateNestedManyWithoutTournamentInputSchema: z.ZodType<Prisma.GroupCreateNestedManyWithoutTournamentInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutTournamentInputSchema),z.lazy(() => GroupCreateWithoutTournamentInputSchema).array(),z.lazy(() => GroupUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => GroupUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GroupCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => GroupCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GroupCreateManyTournamentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GroupWhereUniqueInputSchema),z.lazy(() => GroupWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamUncheckedCreateNestedManyWithoutTournamentInputSchema: z.ZodType<Prisma.TeamUncheckedCreateNestedManyWithoutTournamentInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutTournamentInputSchema),z.lazy(() => TeamCreateWithoutTournamentInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => TeamCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyTournamentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutTournamentInputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutTournamentInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTournamentInputSchema),z.lazy(() => MatchCreateWithoutTournamentInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTournamentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GroupUncheckedCreateNestedManyWithoutTournamentInputSchema: z.ZodType<Prisma.GroupUncheckedCreateNestedManyWithoutTournamentInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutTournamentInputSchema),z.lazy(() => GroupCreateWithoutTournamentInputSchema).array(),z.lazy(() => GroupUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => GroupUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GroupCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => GroupCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GroupCreateManyTournamentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GroupWhereUniqueInputSchema),z.lazy(() => GroupWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const EnumTournamentSizeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTournamentSizeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TournamentSizeSchema).optional()
}).strict();

export const EnumTournamentStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTournamentStateFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TournamentStateSchema).optional()
}).strict();

export const TeamUpdateManyWithoutTournamentNestedInputSchema: z.ZodType<Prisma.TeamUpdateManyWithoutTournamentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutTournamentInputSchema),z.lazy(() => TeamCreateWithoutTournamentInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => TeamCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamUpsertWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => TeamUpsertWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyTournamentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => TeamUpdateWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamUpdateManyWithWhereWithoutTournamentInputSchema),z.lazy(() => TeamUpdateManyWithWhereWithoutTournamentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUpdateManyWithoutTournamentNestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutTournamentNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTournamentInputSchema),z.lazy(() => MatchCreateWithoutTournamentInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTournamentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutTournamentInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutTournamentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GroupUpdateManyWithoutTournamentNestedInputSchema: z.ZodType<Prisma.GroupUpdateManyWithoutTournamentNestedInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutTournamentInputSchema),z.lazy(() => GroupCreateWithoutTournamentInputSchema).array(),z.lazy(() => GroupUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => GroupUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GroupCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => GroupCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GroupUpsertWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => GroupUpsertWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GroupCreateManyTournamentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GroupWhereUniqueInputSchema),z.lazy(() => GroupWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GroupWhereUniqueInputSchema),z.lazy(() => GroupWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GroupWhereUniqueInputSchema),z.lazy(() => GroupWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GroupWhereUniqueInputSchema),z.lazy(() => GroupWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GroupUpdateWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => GroupUpdateWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GroupUpdateManyWithWhereWithoutTournamentInputSchema),z.lazy(() => GroupUpdateManyWithWhereWithoutTournamentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GroupScalarWhereInputSchema),z.lazy(() => GroupScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamUncheckedUpdateManyWithoutTournamentNestedInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutTournamentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutTournamentInputSchema),z.lazy(() => TeamCreateWithoutTournamentInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => TeamCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamUpsertWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => TeamUpsertWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyTournamentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => TeamUpdateWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamUpdateManyWithWhereWithoutTournamentInputSchema),z.lazy(() => TeamUpdateManyWithWhereWithoutTournamentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutTournamentNestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutTournamentNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTournamentInputSchema),z.lazy(() => MatchCreateWithoutTournamentInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTournamentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutTournamentInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutTournamentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GroupUncheckedUpdateManyWithoutTournamentNestedInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateManyWithoutTournamentNestedInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutTournamentInputSchema),z.lazy(() => GroupCreateWithoutTournamentInputSchema).array(),z.lazy(() => GroupUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => GroupUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GroupCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => GroupCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GroupUpsertWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => GroupUpsertWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GroupCreateManyTournamentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GroupWhereUniqueInputSchema),z.lazy(() => GroupWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GroupWhereUniqueInputSchema),z.lazy(() => GroupWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GroupWhereUniqueInputSchema),z.lazy(() => GroupWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GroupWhereUniqueInputSchema),z.lazy(() => GroupWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GroupUpdateWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => GroupUpdateWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GroupUpdateManyWithWhereWithoutTournamentInputSchema),z.lazy(() => GroupUpdateManyWithWhereWithoutTournamentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GroupScalarWhereInputSchema),z.lazy(() => GroupScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlayerCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.PlayerCreateNestedManyWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PlayerCreateManyTeamInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TournamentCreateNestedOneWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentCreateNestedOneWithoutTeamsInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutTeamsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TournamentCreateOrConnectWithoutTeamsInputSchema).optional(),
  connect: z.lazy(() => TournamentWhereUniqueInputSchema).optional()
}).strict();

export const MatchCreateNestedManyWithoutTeam1InputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutTeam1Input> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam1InputSchema),z.lazy(() => MatchCreateWithoutTeam1InputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeam1InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam1InputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeam1InputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeam1InputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeam1InputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchCreateNestedManyWithoutTeam2InputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutTeam2Input> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam2InputSchema),z.lazy(() => MatchCreateWithoutTeam2InputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeam2InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam2InputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeam2InputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeam2InputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeam2InputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchCreateNestedManyWithoutWinnerInputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutWinnerInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchCreateWithoutWinnerInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema),z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyWinnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchCreateNestedManyWithoutLooserInputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutLooserInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutLooserInputSchema),z.lazy(() => MatchCreateWithoutLooserInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutLooserInputSchema),z.lazy(() => MatchUncheckedCreateWithoutLooserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutLooserInputSchema),z.lazy(() => MatchCreateOrConnectWithoutLooserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyLooserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GroupCreateNestedOneWithoutTeamsInputSchema: z.ZodType<Prisma.GroupCreateNestedOneWithoutTeamsInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutTeamsInputSchema),z.lazy(() => GroupUncheckedCreateWithoutTeamsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupCreateOrConnectWithoutTeamsInputSchema).optional(),
  connect: z.lazy(() => GroupWhereUniqueInputSchema).optional()
}).strict();

export const PlayerUncheckedCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateNestedManyWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PlayerCreateManyTeamInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutTeam1InputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutTeam1Input> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam1InputSchema),z.lazy(() => MatchCreateWithoutTeam1InputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeam1InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam1InputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeam1InputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeam1InputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeam1InputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutTeam2InputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutTeam2Input> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam2InputSchema),z.lazy(() => MatchCreateWithoutTeam2InputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeam2InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam2InputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeam2InputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeam2InputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeam2InputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutWinnerInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchCreateWithoutWinnerInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema),z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyWinnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutLooserInputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutLooserInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutLooserInputSchema),z.lazy(() => MatchCreateWithoutLooserInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutLooserInputSchema),z.lazy(() => MatchUncheckedCreateWithoutLooserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutLooserInputSchema),z.lazy(() => MatchCreateOrConnectWithoutLooserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyLooserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlayerUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.PlayerUpdateManyWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PlayerCreateManyTeamInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema),z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PlayerScalarWhereInputSchema),z.lazy(() => PlayerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema: z.ZodType<Prisma.TournamentUpdateOneRequiredWithoutTeamsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutTeamsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TournamentCreateOrConnectWithoutTeamsInputSchema).optional(),
  upsert: z.lazy(() => TournamentUpsertWithoutTeamsInputSchema).optional(),
  connect: z.lazy(() => TournamentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TournamentUpdateToOneWithWhereWithoutTeamsInputSchema),z.lazy(() => TournamentUpdateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutTeamsInputSchema) ]).optional(),
}).strict();

export const MatchUpdateManyWithoutTeam1NestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutTeam1NestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam1InputSchema),z.lazy(() => MatchCreateWithoutTeam1InputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeam1InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam1InputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeam1InputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeam1InputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeam1InputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeam1InputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeam1InputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeam1InputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeam1InputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutTeam1InputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutTeam1InputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUpdateManyWithoutTeam2NestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutTeam2NestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam2InputSchema),z.lazy(() => MatchCreateWithoutTeam2InputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeam2InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam2InputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeam2InputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeam2InputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeam2InputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeam2InputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeam2InputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeam2InputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeam2InputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutTeam2InputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutTeam2InputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUpdateManyWithoutWinnerNestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutWinnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchCreateWithoutWinnerInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema),z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutWinnerInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutWinnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyWinnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutWinnerInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutWinnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutWinnerInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutWinnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUpdateManyWithoutLooserNestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutLooserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutLooserInputSchema),z.lazy(() => MatchCreateWithoutLooserInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutLooserInputSchema),z.lazy(() => MatchUncheckedCreateWithoutLooserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutLooserInputSchema),z.lazy(() => MatchCreateOrConnectWithoutLooserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutLooserInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutLooserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyLooserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutLooserInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutLooserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutLooserInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutLooserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GroupUpdateOneWithoutTeamsNestedInputSchema: z.ZodType<Prisma.GroupUpdateOneWithoutTeamsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutTeamsInputSchema),z.lazy(() => GroupUncheckedCreateWithoutTeamsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupCreateOrConnectWithoutTeamsInputSchema).optional(),
  upsert: z.lazy(() => GroupUpsertWithoutTeamsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => GroupWhereInputSchema) ]).optional(),
  connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GroupUpdateToOneWithWhereWithoutTeamsInputSchema),z.lazy(() => GroupUpdateWithoutTeamsInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutTeamsInputSchema) ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateManyWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PlayerCreateManyTeamInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema),z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PlayerScalarWhereInputSchema),z.lazy(() => PlayerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutTeam1NestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutTeam1NestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam1InputSchema),z.lazy(() => MatchCreateWithoutTeam1InputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeam1InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam1InputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeam1InputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeam1InputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeam1InputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeam1InputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeam1InputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeam1InputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeam1InputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutTeam1InputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutTeam1InputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutTeam2NestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutTeam2NestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam2InputSchema),z.lazy(() => MatchCreateWithoutTeam2InputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeam2InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam2InputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeam2InputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeam2InputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeam2InputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeam2InputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeam2InputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeam2InputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeam2InputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutTeam2InputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutTeam2InputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutWinnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchCreateWithoutWinnerInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema),z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutWinnerInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutWinnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyWinnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutWinnerInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutWinnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutWinnerInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutWinnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutLooserNestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutLooserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutLooserInputSchema),z.lazy(() => MatchCreateWithoutLooserInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutLooserInputSchema),z.lazy(() => MatchUncheckedCreateWithoutLooserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutLooserInputSchema),z.lazy(() => MatchCreateOrConnectWithoutLooserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutLooserInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutLooserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyLooserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutLooserInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutLooserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutLooserInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutLooserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamCreateNestedOneWithoutPlayersInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutPlayersInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutPlayersInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const TeamUpdateOneRequiredWithoutPlayersNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneRequiredWithoutPlayersNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutPlayersInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutPlayersInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutPlayersInputSchema),z.lazy(() => TeamUpdateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutPlayersInputSchema) ]).optional(),
}).strict();

export const TournamentCreateNestedOneWithoutGroupsInputSchema: z.ZodType<Prisma.TournamentCreateNestedOneWithoutGroupsInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutGroupsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutGroupsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TournamentCreateOrConnectWithoutGroupsInputSchema).optional(),
  connect: z.lazy(() => TournamentWhereUniqueInputSchema).optional()
}).strict();

export const TeamCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.TeamCreateNestedManyWithoutGroupInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutGroupInputSchema),z.lazy(() => TeamCreateWithoutGroupInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutGroupInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutGroupInputSchema),z.lazy(() => TeamCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyGroupInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamUncheckedCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.TeamUncheckedCreateNestedManyWithoutGroupInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutGroupInputSchema),z.lazy(() => TeamCreateWithoutGroupInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutGroupInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutGroupInputSchema),z.lazy(() => TeamCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyGroupInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TournamentUpdateOneRequiredWithoutGroupsNestedInputSchema: z.ZodType<Prisma.TournamentUpdateOneRequiredWithoutGroupsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutGroupsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutGroupsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TournamentCreateOrConnectWithoutGroupsInputSchema).optional(),
  upsert: z.lazy(() => TournamentUpsertWithoutGroupsInputSchema).optional(),
  connect: z.lazy(() => TournamentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TournamentUpdateToOneWithWhereWithoutGroupsInputSchema),z.lazy(() => TournamentUpdateWithoutGroupsInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutGroupsInputSchema) ]).optional(),
}).strict();

export const TeamUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.TeamUpdateManyWithoutGroupNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutGroupInputSchema),z.lazy(() => TeamCreateWithoutGroupInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutGroupInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutGroupInputSchema),z.lazy(() => TeamCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamUpsertWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => TeamUpsertWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyGroupInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => TeamUpdateWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamUpdateManyWithWhereWithoutGroupInputSchema),z.lazy(() => TeamUpdateManyWithWhereWithoutGroupInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamUncheckedUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutGroupNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutGroupInputSchema),z.lazy(() => TeamCreateWithoutGroupInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutGroupInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutGroupInputSchema),z.lazy(() => TeamCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamUpsertWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => TeamUpsertWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyGroupInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => TeamUpdateWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamUpdateManyWithWhereWithoutGroupInputSchema),z.lazy(() => TeamUpdateManyWithWhereWithoutGroupInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamCreateNestedOneWithoutTeam1MatchesInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutTeam1MatchesInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutTeam1MatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeam1MatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutTeam1MatchesInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const TeamCreateNestedOneWithoutTeam2MatchesInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutTeam2MatchesInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutTeam2MatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeam2MatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutTeam2MatchesInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const TeamCreateNestedOneWithoutWinnerMatchesInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutWinnerMatchesInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutWinnerMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutWinnerMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutWinnerMatchesInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const TeamCreateNestedOneWithoutLooserMatchesInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutLooserMatchesInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutLooserMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutLooserMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutLooserMatchesInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const TournamentCreateNestedOneWithoutMatchesInputSchema: z.ZodType<Prisma.TournamentCreateNestedOneWithoutMatchesInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutMatchesInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TournamentCreateOrConnectWithoutMatchesInputSchema).optional(),
  connect: z.lazy(() => TournamentWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const TeamUpdateOneRequiredWithoutTeam1MatchesNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneRequiredWithoutTeam1MatchesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutTeam1MatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeam1MatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutTeam1MatchesInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutTeam1MatchesInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutTeam1MatchesInputSchema),z.lazy(() => TeamUpdateWithoutTeam1MatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTeam1MatchesInputSchema) ]).optional(),
}).strict();

export const TeamUpdateOneRequiredWithoutTeam2MatchesNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneRequiredWithoutTeam2MatchesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutTeam2MatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeam2MatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutTeam2MatchesInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutTeam2MatchesInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutTeam2MatchesInputSchema),z.lazy(() => TeamUpdateWithoutTeam2MatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTeam2MatchesInputSchema) ]).optional(),
}).strict();

export const TeamUpdateOneWithoutWinnerMatchesNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneWithoutWinnerMatchesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutWinnerMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutWinnerMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutWinnerMatchesInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutWinnerMatchesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutWinnerMatchesInputSchema),z.lazy(() => TeamUpdateWithoutWinnerMatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutWinnerMatchesInputSchema) ]).optional(),
}).strict();

export const TeamUpdateOneWithoutLooserMatchesNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneWithoutLooserMatchesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutLooserMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutLooserMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutLooserMatchesInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutLooserMatchesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutLooserMatchesInputSchema),z.lazy(() => TeamUpdateWithoutLooserMatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutLooserMatchesInputSchema) ]).optional(),
}).strict();

export const TournamentUpdateOneRequiredWithoutMatchesNestedInputSchema: z.ZodType<Prisma.TournamentUpdateOneRequiredWithoutMatchesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutMatchesInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TournamentCreateOrConnectWithoutMatchesInputSchema).optional(),
  upsert: z.lazy(() => TournamentUpsertWithoutMatchesInputSchema).optional(),
  connect: z.lazy(() => TournamentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TournamentUpdateToOneWithWhereWithoutMatchesInputSchema),z.lazy(() => TournamentUpdateWithoutMatchesInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutMatchesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTournamentSizeFilterSchema: z.ZodType<Prisma.NestedEnumTournamentSizeFilter> = z.object({
  equals: z.lazy(() => TournamentSizeSchema).optional(),
  in: z.lazy(() => TournamentSizeSchema).array().optional(),
  notIn: z.lazy(() => TournamentSizeSchema).array().optional(),
  not: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => NestedEnumTournamentSizeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTournamentStateFilterSchema: z.ZodType<Prisma.NestedEnumTournamentStateFilter> = z.object({
  equals: z.lazy(() => TournamentStateSchema).optional(),
  in: z.lazy(() => TournamentStateSchema).array().optional(),
  notIn: z.lazy(() => TournamentStateSchema).array().optional(),
  not: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => NestedEnumTournamentStateFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumTournamentSizeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTournamentSizeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TournamentSizeSchema).optional(),
  in: z.lazy(() => TournamentSizeSchema).array().optional(),
  notIn: z.lazy(() => TournamentSizeSchema).array().optional(),
  not: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => NestedEnumTournamentSizeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTournamentSizeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTournamentSizeFilterSchema).optional()
}).strict();

export const NestedEnumTournamentStateWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTournamentStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TournamentStateSchema).optional(),
  in: z.lazy(() => TournamentStateSchema).array().optional(),
  notIn: z.lazy(() => TournamentStateSchema).array().optional(),
  not: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => NestedEnumTournamentStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTournamentStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTournamentStateFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const TeamCreateWithoutTournamentInputSchema: z.ZodType<Prisma.TeamCreateWithoutTournamentInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  team1Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchCreateNestedManyWithoutLooserInputSchema).optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutTournamentInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutTournamentInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  groupId: z.string().optional().nullable(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutLooserInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutTournamentInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutTournamentInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutTournamentInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTournamentInputSchema) ]),
}).strict();

export const TeamCreateManyTournamentInputEnvelopeSchema: z.ZodType<Prisma.TeamCreateManyTournamentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TeamCreateManyTournamentInputSchema),z.lazy(() => TeamCreateManyTournamentInputSchema).array() ]),
}).strict();

export const MatchCreateWithoutTournamentInputSchema: z.ZodType<Prisma.MatchCreateWithoutTournamentInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Score: z.number().int(),
  team2Score: z.number().int(),
  team1: z.lazy(() => TeamCreateNestedOneWithoutTeam1MatchesInputSchema),
  team2: z.lazy(() => TeamCreateNestedOneWithoutTeam2MatchesInputSchema),
  winner: z.lazy(() => TeamCreateNestedOneWithoutWinnerMatchesInputSchema).optional(),
  looser: z.lazy(() => TeamCreateNestedOneWithoutLooserMatchesInputSchema).optional()
}).strict();

export const MatchUncheckedCreateWithoutTournamentInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutTournamentInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Id: z.string(),
  team2Id: z.string(),
  winnerId: z.string().optional().nullable(),
  looserId: z.string().optional().nullable(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const MatchCreateOrConnectWithoutTournamentInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutTournamentInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutTournamentInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTournamentInputSchema) ]),
}).strict();

export const MatchCreateManyTournamentInputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyTournamentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyTournamentInputSchema),z.lazy(() => MatchCreateManyTournamentInputSchema).array() ]),
}).strict();

export const GroupCreateWithoutTournamentInputSchema: z.ZodType<Prisma.GroupCreateWithoutTournamentInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teams: z.lazy(() => TeamCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUncheckedCreateWithoutTournamentInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutTournamentInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teams: z.lazy(() => TeamUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupCreateOrConnectWithoutTournamentInputSchema: z.ZodType<Prisma.GroupCreateOrConnectWithoutTournamentInput> = z.object({
  where: z.lazy(() => GroupWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GroupCreateWithoutTournamentInputSchema),z.lazy(() => GroupUncheckedCreateWithoutTournamentInputSchema) ]),
}).strict();

export const GroupCreateManyTournamentInputEnvelopeSchema: z.ZodType<Prisma.GroupCreateManyTournamentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GroupCreateManyTournamentInputSchema),z.lazy(() => GroupCreateManyTournamentInputSchema).array() ]),
}).strict();

export const TeamUpsertWithWhereUniqueWithoutTournamentInputSchema: z.ZodType<Prisma.TeamUpsertWithWhereUniqueWithoutTournamentInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TeamUpdateWithoutTournamentInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTournamentInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutTournamentInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTournamentInputSchema) ]),
}).strict();

export const TeamUpdateWithWhereUniqueWithoutTournamentInputSchema: z.ZodType<Prisma.TeamUpdateWithWhereUniqueWithoutTournamentInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TeamUpdateWithoutTournamentInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTournamentInputSchema) ]),
}).strict();

export const TeamUpdateManyWithWhereWithoutTournamentInputSchema: z.ZodType<Prisma.TeamUpdateManyWithWhereWithoutTournamentInput> = z.object({
  where: z.lazy(() => TeamScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TeamUpdateManyMutationInputSchema),z.lazy(() => TeamUncheckedUpdateManyWithoutTournamentInputSchema) ]),
}).strict();

export const TeamScalarWhereInputSchema: z.ZodType<Prisma.TeamScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MatchUpsertWithWhereUniqueWithoutTournamentInputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutTournamentInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutTournamentInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutTournamentInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutTournamentInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTournamentInputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutTournamentInputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutTournamentInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutTournamentInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutTournamentInputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutTournamentInputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutTournamentInput> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutTournamentInputSchema) ]),
}).strict();

export const MatchScalarWhereInputSchema: z.ZodType<Prisma.MatchScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  team1Id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team2Id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  winnerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  looserId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team1Score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  team2Score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const GroupUpsertWithWhereUniqueWithoutTournamentInputSchema: z.ZodType<Prisma.GroupUpsertWithWhereUniqueWithoutTournamentInput> = z.object({
  where: z.lazy(() => GroupWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GroupUpdateWithoutTournamentInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutTournamentInputSchema) ]),
  create: z.union([ z.lazy(() => GroupCreateWithoutTournamentInputSchema),z.lazy(() => GroupUncheckedCreateWithoutTournamentInputSchema) ]),
}).strict();

export const GroupUpdateWithWhereUniqueWithoutTournamentInputSchema: z.ZodType<Prisma.GroupUpdateWithWhereUniqueWithoutTournamentInput> = z.object({
  where: z.lazy(() => GroupWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GroupUpdateWithoutTournamentInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutTournamentInputSchema) ]),
}).strict();

export const GroupUpdateManyWithWhereWithoutTournamentInputSchema: z.ZodType<Prisma.GroupUpdateManyWithWhereWithoutTournamentInput> = z.object({
  where: z.lazy(() => GroupScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GroupUpdateManyMutationInputSchema),z.lazy(() => GroupUncheckedUpdateManyWithoutTournamentInputSchema) ]),
}).strict();

export const GroupScalarWhereInputSchema: z.ZodType<Prisma.GroupScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GroupScalarWhereInputSchema),z.lazy(() => GroupScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupScalarWhereInputSchema),z.lazy(() => GroupScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PlayerCreateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerCreateWithoutTeamInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PlayerUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateWithoutTeamInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PlayerCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.PlayerCreateOrConnectWithoutTeamInput> = z.object({
  where: z.lazy(() => PlayerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const PlayerCreateManyTeamInputEnvelopeSchema: z.ZodType<Prisma.PlayerCreateManyTeamInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PlayerCreateManyTeamInputSchema),z.lazy(() => PlayerCreateManyTeamInputSchema).array() ]),
}).strict();

export const TournamentCreateWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentCreateWithoutTeamsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentSize: z.lazy(() => TournamentSizeSchema).optional(),
  tournamentState: z.lazy(() => TournamentStateSchema).optional(),
  matches: z.lazy(() => MatchCreateNestedManyWithoutTournamentInputSchema).optional(),
  groups: z.lazy(() => GroupCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentUncheckedCreateWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentUncheckedCreateWithoutTeamsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentSize: z.lazy(() => TournamentSizeSchema).optional(),
  tournamentState: z.lazy(() => TournamentStateSchema).optional(),
  matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTournamentInputSchema).optional(),
  groups: z.lazy(() => GroupUncheckedCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentCreateOrConnectWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentCreateOrConnectWithoutTeamsInput> = z.object({
  where: z.lazy(() => TournamentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TournamentCreateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutTeamsInputSchema) ]),
}).strict();

export const MatchCreateWithoutTeam1InputSchema: z.ZodType<Prisma.MatchCreateWithoutTeam1Input> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Score: z.number().int(),
  team2Score: z.number().int(),
  team2: z.lazy(() => TeamCreateNestedOneWithoutTeam2MatchesInputSchema),
  winner: z.lazy(() => TeamCreateNestedOneWithoutWinnerMatchesInputSchema).optional(),
  looser: z.lazy(() => TeamCreateNestedOneWithoutLooserMatchesInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutMatchesInputSchema)
}).strict();

export const MatchUncheckedCreateWithoutTeam1InputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutTeam1Input> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team2Id: z.string(),
  winnerId: z.string().optional().nullable(),
  looserId: z.string().optional().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const MatchCreateOrConnectWithoutTeam1InputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutTeam1Input> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam1InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam1InputSchema) ]),
}).strict();

export const MatchCreateManyTeam1InputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyTeam1InputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyTeam1InputSchema),z.lazy(() => MatchCreateManyTeam1InputSchema).array() ]),
}).strict();

export const MatchCreateWithoutTeam2InputSchema: z.ZodType<Prisma.MatchCreateWithoutTeam2Input> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Score: z.number().int(),
  team2Score: z.number().int(),
  team1: z.lazy(() => TeamCreateNestedOneWithoutTeam1MatchesInputSchema),
  winner: z.lazy(() => TeamCreateNestedOneWithoutWinnerMatchesInputSchema).optional(),
  looser: z.lazy(() => TeamCreateNestedOneWithoutLooserMatchesInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutMatchesInputSchema)
}).strict();

export const MatchUncheckedCreateWithoutTeam2InputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutTeam2Input> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Id: z.string(),
  winnerId: z.string().optional().nullable(),
  looserId: z.string().optional().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const MatchCreateOrConnectWithoutTeam2InputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutTeam2Input> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam2InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam2InputSchema) ]),
}).strict();

export const MatchCreateManyTeam2InputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyTeam2InputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyTeam2InputSchema),z.lazy(() => MatchCreateManyTeam2InputSchema).array() ]),
}).strict();

export const MatchCreateWithoutWinnerInputSchema: z.ZodType<Prisma.MatchCreateWithoutWinnerInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Score: z.number().int(),
  team2Score: z.number().int(),
  team1: z.lazy(() => TeamCreateNestedOneWithoutTeam1MatchesInputSchema),
  team2: z.lazy(() => TeamCreateNestedOneWithoutTeam2MatchesInputSchema),
  looser: z.lazy(() => TeamCreateNestedOneWithoutLooserMatchesInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutMatchesInputSchema)
}).strict();

export const MatchUncheckedCreateWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutWinnerInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Id: z.string(),
  team2Id: z.string(),
  looserId: z.string().optional().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const MatchCreateOrConnectWithoutWinnerInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutWinnerInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema) ]),
}).strict();

export const MatchCreateManyWinnerInputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyWinnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyWinnerInputSchema),z.lazy(() => MatchCreateManyWinnerInputSchema).array() ]),
}).strict();

export const MatchCreateWithoutLooserInputSchema: z.ZodType<Prisma.MatchCreateWithoutLooserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Score: z.number().int(),
  team2Score: z.number().int(),
  team1: z.lazy(() => TeamCreateNestedOneWithoutTeam1MatchesInputSchema),
  team2: z.lazy(() => TeamCreateNestedOneWithoutTeam2MatchesInputSchema),
  winner: z.lazy(() => TeamCreateNestedOneWithoutWinnerMatchesInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutMatchesInputSchema)
}).strict();

export const MatchUncheckedCreateWithoutLooserInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutLooserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Id: z.string(),
  team2Id: z.string(),
  winnerId: z.string().optional().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const MatchCreateOrConnectWithoutLooserInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutLooserInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutLooserInputSchema),z.lazy(() => MatchUncheckedCreateWithoutLooserInputSchema) ]),
}).strict();

export const MatchCreateManyLooserInputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyLooserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyLooserInputSchema),z.lazy(() => MatchCreateManyLooserInputSchema).array() ]),
}).strict();

export const GroupCreateWithoutTeamsInputSchema: z.ZodType<Prisma.GroupCreateWithoutTeamsInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutGroupsInputSchema)
}).strict();

export const GroupUncheckedCreateWithoutTeamsInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutTeamsInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string()
}).strict();

export const GroupCreateOrConnectWithoutTeamsInputSchema: z.ZodType<Prisma.GroupCreateOrConnectWithoutTeamsInput> = z.object({
  where: z.lazy(() => GroupWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GroupCreateWithoutTeamsInputSchema),z.lazy(() => GroupUncheckedCreateWithoutTeamsInputSchema) ]),
}).strict();

export const PlayerUpsertWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpsertWithWhereUniqueWithoutTeamInput> = z.object({
  where: z.lazy(() => PlayerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PlayerUpdateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutTeamInputSchema) ]),
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const PlayerUpdateWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpdateWithWhereUniqueWithoutTeamInput> = z.object({
  where: z.lazy(() => PlayerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PlayerUpdateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutTeamInputSchema) ]),
}).strict();

export const PlayerUpdateManyWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpdateManyWithWhereWithoutTeamInput> = z.object({
  where: z.lazy(() => PlayerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PlayerUpdateManyMutationInputSchema),z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamInputSchema) ]),
}).strict();

export const PlayerScalarWhereInputSchema: z.ZodType<Prisma.PlayerScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlayerScalarWhereInputSchema),z.lazy(() => PlayerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerScalarWhereInputSchema),z.lazy(() => PlayerScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TournamentUpsertWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentUpsertWithoutTeamsInput> = z.object({
  update: z.union([ z.lazy(() => TournamentUpdateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutTeamsInputSchema) ]),
  create: z.union([ z.lazy(() => TournamentCreateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutTeamsInputSchema) ]),
  where: z.lazy(() => TournamentWhereInputSchema).optional()
}).strict();

export const TournamentUpdateToOneWithWhereWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentUpdateToOneWithWhereWithoutTeamsInput> = z.object({
  where: z.lazy(() => TournamentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TournamentUpdateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutTeamsInputSchema) ]),
}).strict();

export const TournamentUpdateWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentUpdateWithoutTeamsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentSize: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => EnumTournamentSizeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => EnumTournamentStateFieldUpdateOperationsInputSchema) ]).optional(),
  matches: z.lazy(() => MatchUpdateManyWithoutTournamentNestedInputSchema).optional(),
  groups: z.lazy(() => GroupUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentUncheckedUpdateWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateWithoutTeamsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentSize: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => EnumTournamentSizeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => EnumTournamentStateFieldUpdateOperationsInputSchema) ]).optional(),
  matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional(),
  groups: z.lazy(() => GroupUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const MatchUpsertWithWhereUniqueWithoutTeam1InputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutTeam1Input> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutTeam1InputSchema),z.lazy(() => MatchUncheckedUpdateWithoutTeam1InputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam1InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam1InputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutTeam1InputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutTeam1Input> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutTeam1InputSchema),z.lazy(() => MatchUncheckedUpdateWithoutTeam1InputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutTeam1InputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutTeam1Input> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutTeam1InputSchema) ]),
}).strict();

export const MatchUpsertWithWhereUniqueWithoutTeam2InputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutTeam2Input> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutTeam2InputSchema),z.lazy(() => MatchUncheckedUpdateWithoutTeam2InputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutTeam2InputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeam2InputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutTeam2InputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutTeam2Input> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutTeam2InputSchema),z.lazy(() => MatchUncheckedUpdateWithoutTeam2InputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutTeam2InputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutTeam2Input> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutTeam2InputSchema) ]),
}).strict();

export const MatchUpsertWithWhereUniqueWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutWinnerInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutWinnerInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutWinnerInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutWinnerInputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutWinnerInput> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerInputSchema) ]),
}).strict();

export const MatchUpsertWithWhereUniqueWithoutLooserInputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutLooserInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutLooserInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutLooserInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutLooserInputSchema),z.lazy(() => MatchUncheckedCreateWithoutLooserInputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutLooserInputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutLooserInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutLooserInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutLooserInputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutLooserInputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutLooserInput> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutLooserInputSchema) ]),
}).strict();

export const GroupUpsertWithoutTeamsInputSchema: z.ZodType<Prisma.GroupUpsertWithoutTeamsInput> = z.object({
  update: z.union([ z.lazy(() => GroupUpdateWithoutTeamsInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutTeamsInputSchema) ]),
  create: z.union([ z.lazy(() => GroupCreateWithoutTeamsInputSchema),z.lazy(() => GroupUncheckedCreateWithoutTeamsInputSchema) ]),
  where: z.lazy(() => GroupWhereInputSchema).optional()
}).strict();

export const GroupUpdateToOneWithWhereWithoutTeamsInputSchema: z.ZodType<Prisma.GroupUpdateToOneWithWhereWithoutTeamsInput> = z.object({
  where: z.lazy(() => GroupWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GroupUpdateWithoutTeamsInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutTeamsInputSchema) ]),
}).strict();

export const GroupUpdateWithoutTeamsInputSchema: z.ZodType<Prisma.GroupUpdateWithoutTeamsInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutGroupsNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateWithoutTeamsInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutTeamsInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamCreateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamCreateWithoutPlayersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutTeamsInputSchema),
  team1Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchCreateNestedManyWithoutLooserInputSchema).optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutPlayersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string(),
  groupId: z.string().optional().nullable(),
  team1Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutLooserInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutPlayersInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutPlayersInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema) ]),
}).strict();

export const TeamUpsertWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUpsertWithoutPlayersInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutPlayersInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutPlayersInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutPlayersInputSchema) ]),
}).strict();

export const TeamUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUpdateWithoutPlayersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUpdateManyWithoutLooserNestedInputSchema).optional(),
  group: z.lazy(() => GroupUpdateOneWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutPlayersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  team1Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutLooserNestedInputSchema).optional()
}).strict();

export const TournamentCreateWithoutGroupsInputSchema: z.ZodType<Prisma.TournamentCreateWithoutGroupsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentSize: z.lazy(() => TournamentSizeSchema).optional(),
  tournamentState: z.lazy(() => TournamentStateSchema).optional(),
  teams: z.lazy(() => TeamCreateNestedManyWithoutTournamentInputSchema).optional(),
  matches: z.lazy(() => MatchCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentUncheckedCreateWithoutGroupsInputSchema: z.ZodType<Prisma.TournamentUncheckedCreateWithoutGroupsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentSize: z.lazy(() => TournamentSizeSchema).optional(),
  tournamentState: z.lazy(() => TournamentStateSchema).optional(),
  teams: z.lazy(() => TeamUncheckedCreateNestedManyWithoutTournamentInputSchema).optional(),
  matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentCreateOrConnectWithoutGroupsInputSchema: z.ZodType<Prisma.TournamentCreateOrConnectWithoutGroupsInput> = z.object({
  where: z.lazy(() => TournamentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TournamentCreateWithoutGroupsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutGroupsInputSchema) ]),
}).strict();

export const TeamCreateWithoutGroupInputSchema: z.ZodType<Prisma.TeamCreateWithoutGroupInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutTeamsInputSchema),
  team1Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchCreateNestedManyWithoutLooserInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutGroupInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutLooserInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutGroupInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutGroupInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutGroupInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGroupInputSchema) ]),
}).strict();

export const TeamCreateManyGroupInputEnvelopeSchema: z.ZodType<Prisma.TeamCreateManyGroupInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TeamCreateManyGroupInputSchema),z.lazy(() => TeamCreateManyGroupInputSchema).array() ]),
}).strict();

export const TournamentUpsertWithoutGroupsInputSchema: z.ZodType<Prisma.TournamentUpsertWithoutGroupsInput> = z.object({
  update: z.union([ z.lazy(() => TournamentUpdateWithoutGroupsInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutGroupsInputSchema) ]),
  create: z.union([ z.lazy(() => TournamentCreateWithoutGroupsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutGroupsInputSchema) ]),
  where: z.lazy(() => TournamentWhereInputSchema).optional()
}).strict();

export const TournamentUpdateToOneWithWhereWithoutGroupsInputSchema: z.ZodType<Prisma.TournamentUpdateToOneWithWhereWithoutGroupsInput> = z.object({
  where: z.lazy(() => TournamentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TournamentUpdateWithoutGroupsInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutGroupsInputSchema) ]),
}).strict();

export const TournamentUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.TournamentUpdateWithoutGroupsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentSize: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => EnumTournamentSizeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => EnumTournamentStateFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUpdateManyWithoutTournamentNestedInputSchema).optional(),
  matches: z.lazy(() => MatchUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentUncheckedUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateWithoutGroupsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentSize: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => EnumTournamentSizeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => EnumTournamentStateFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional(),
  matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TeamUpsertWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.TeamUpsertWithWhereUniqueWithoutGroupInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TeamUpdateWithoutGroupInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutGroupInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutGroupInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGroupInputSchema) ]),
}).strict();

export const TeamUpdateWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.TeamUpdateWithWhereUniqueWithoutGroupInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TeamUpdateWithoutGroupInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutGroupInputSchema) ]),
}).strict();

export const TeamUpdateManyWithWhereWithoutGroupInputSchema: z.ZodType<Prisma.TeamUpdateManyWithWhereWithoutGroupInput> = z.object({
  where: z.lazy(() => TeamScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TeamUpdateManyMutationInputSchema),z.lazy(() => TeamUncheckedUpdateManyWithoutGroupInputSchema) ]),
}).strict();

export const TeamCreateWithoutTeam1MatchesInputSchema: z.ZodType<Prisma.TeamCreateWithoutTeam1MatchesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutTeamsInputSchema),
  team2Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchCreateNestedManyWithoutLooserInputSchema).optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutTeam1MatchesInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutTeam1MatchesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string(),
  groupId: z.string().optional().nullable(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutLooserInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutTeam1MatchesInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutTeam1MatchesInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutTeam1MatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeam1MatchesInputSchema) ]),
}).strict();

export const TeamCreateWithoutTeam2MatchesInputSchema: z.ZodType<Prisma.TeamCreateWithoutTeam2MatchesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutTeamsInputSchema),
  team1Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam1InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchCreateNestedManyWithoutLooserInputSchema).optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutTeam2MatchesInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutTeam2MatchesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string(),
  groupId: z.string().optional().nullable(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam1InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutLooserInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutTeam2MatchesInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutTeam2MatchesInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutTeam2MatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeam2MatchesInputSchema) ]),
}).strict();

export const TeamCreateWithoutWinnerMatchesInputSchema: z.ZodType<Prisma.TeamCreateWithoutWinnerMatchesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutTeamsInputSchema),
  team1Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam2InputSchema).optional(),
  looserMatches: z.lazy(() => MatchCreateNestedManyWithoutLooserInputSchema).optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutWinnerMatchesInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutWinnerMatchesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string(),
  groupId: z.string().optional().nullable(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam2InputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutLooserInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutWinnerMatchesInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutWinnerMatchesInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutWinnerMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutWinnerMatchesInputSchema) ]),
}).strict();

export const TeamCreateWithoutLooserMatchesInputSchema: z.ZodType<Prisma.TeamCreateWithoutLooserMatchesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutTeamsInputSchema),
  team1Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutLooserMatchesInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutLooserMatchesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string(),
  groupId: z.string().optional().nullable(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam1InputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeam2InputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutLooserMatchesInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutLooserMatchesInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutLooserMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutLooserMatchesInputSchema) ]),
}).strict();

export const TournamentCreateWithoutMatchesInputSchema: z.ZodType<Prisma.TournamentCreateWithoutMatchesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentSize: z.lazy(() => TournamentSizeSchema).optional(),
  tournamentState: z.lazy(() => TournamentStateSchema).optional(),
  teams: z.lazy(() => TeamCreateNestedManyWithoutTournamentInputSchema).optional(),
  groups: z.lazy(() => GroupCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentUncheckedCreateWithoutMatchesInputSchema: z.ZodType<Prisma.TournamentUncheckedCreateWithoutMatchesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentSize: z.lazy(() => TournamentSizeSchema).optional(),
  tournamentState: z.lazy(() => TournamentStateSchema).optional(),
  teams: z.lazy(() => TeamUncheckedCreateNestedManyWithoutTournamentInputSchema).optional(),
  groups: z.lazy(() => GroupUncheckedCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentCreateOrConnectWithoutMatchesInputSchema: z.ZodType<Prisma.TournamentCreateOrConnectWithoutMatchesInput> = z.object({
  where: z.lazy(() => TournamentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TournamentCreateWithoutMatchesInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutMatchesInputSchema) ]),
}).strict();

export const TeamUpsertWithoutTeam1MatchesInputSchema: z.ZodType<Prisma.TeamUpsertWithoutTeam1MatchesInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutTeam1MatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTeam1MatchesInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutTeam1MatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeam1MatchesInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutTeam1MatchesInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutTeam1MatchesInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutTeam1MatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTeam1MatchesInputSchema) ]),
}).strict();

export const TeamUpdateWithoutTeam1MatchesInputSchema: z.ZodType<Prisma.TeamUpdateWithoutTeam1MatchesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUpdateManyWithoutLooserNestedInputSchema).optional(),
  group: z.lazy(() => GroupUpdateOneWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutTeam1MatchesInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutTeam1MatchesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutLooserNestedInputSchema).optional()
}).strict();

export const TeamUpsertWithoutTeam2MatchesInputSchema: z.ZodType<Prisma.TeamUpsertWithoutTeam2MatchesInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutTeam2MatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTeam2MatchesInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutTeam2MatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeam2MatchesInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutTeam2MatchesInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutTeam2MatchesInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutTeam2MatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTeam2MatchesInputSchema) ]),
}).strict();

export const TeamUpdateWithoutTeam2MatchesInputSchema: z.ZodType<Prisma.TeamUpdateWithoutTeam2MatchesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUpdateManyWithoutTeam1NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUpdateManyWithoutLooserNestedInputSchema).optional(),
  group: z.lazy(() => GroupUpdateOneWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutTeam2MatchesInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutTeam2MatchesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam1NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutLooserNestedInputSchema).optional()
}).strict();

export const TeamUpsertWithoutWinnerMatchesInputSchema: z.ZodType<Prisma.TeamUpsertWithoutWinnerMatchesInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutWinnerMatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutWinnerMatchesInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutWinnerMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutWinnerMatchesInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutWinnerMatchesInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutWinnerMatchesInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutWinnerMatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutWinnerMatchesInputSchema) ]),
}).strict();

export const TeamUpdateWithoutWinnerMatchesInputSchema: z.ZodType<Prisma.TeamUpdateWithoutWinnerMatchesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUpdateManyWithoutTeam2NestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUpdateManyWithoutLooserNestedInputSchema).optional(),
  group: z.lazy(() => GroupUpdateOneWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutWinnerMatchesInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutWinnerMatchesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam2NestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutLooserNestedInputSchema).optional()
}).strict();

export const TeamUpsertWithoutLooserMatchesInputSchema: z.ZodType<Prisma.TeamUpsertWithoutLooserMatchesInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutLooserMatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutLooserMatchesInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutLooserMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutLooserMatchesInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutLooserMatchesInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutLooserMatchesInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutLooserMatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutLooserMatchesInputSchema) ]),
}).strict();

export const TeamUpdateWithoutLooserMatchesInputSchema: z.ZodType<Prisma.TeamUpdateWithoutLooserMatchesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  group: z.lazy(() => GroupUpdateOneWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutLooserMatchesInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutLooserMatchesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional()
}).strict();

export const TournamentUpsertWithoutMatchesInputSchema: z.ZodType<Prisma.TournamentUpsertWithoutMatchesInput> = z.object({
  update: z.union([ z.lazy(() => TournamentUpdateWithoutMatchesInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutMatchesInputSchema) ]),
  create: z.union([ z.lazy(() => TournamentCreateWithoutMatchesInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutMatchesInputSchema) ]),
  where: z.lazy(() => TournamentWhereInputSchema).optional()
}).strict();

export const TournamentUpdateToOneWithWhereWithoutMatchesInputSchema: z.ZodType<Prisma.TournamentUpdateToOneWithWhereWithoutMatchesInput> = z.object({
  where: z.lazy(() => TournamentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TournamentUpdateWithoutMatchesInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutMatchesInputSchema) ]),
}).strict();

export const TournamentUpdateWithoutMatchesInputSchema: z.ZodType<Prisma.TournamentUpdateWithoutMatchesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentSize: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => EnumTournamentSizeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => EnumTournamentStateFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUpdateManyWithoutTournamentNestedInputSchema).optional(),
  groups: z.lazy(() => GroupUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentUncheckedUpdateWithoutMatchesInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateWithoutMatchesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentSize: z.union([ z.lazy(() => TournamentSizeSchema),z.lazy(() => EnumTournamentSizeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentState: z.union([ z.lazy(() => TournamentStateSchema),z.lazy(() => EnumTournamentStateFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional(),
  groups: z.lazy(() => GroupUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TeamCreateManyTournamentInputSchema: z.ZodType<Prisma.TeamCreateManyTournamentInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  groupId: z.string().optional().nullable()
}).strict();

export const MatchCreateManyTournamentInputSchema: z.ZodType<Prisma.MatchCreateManyTournamentInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Id: z.string(),
  team2Id: z.string(),
  winnerId: z.string().optional().nullable(),
  looserId: z.string().optional().nullable(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const GroupCreateManyTournamentInputSchema: z.ZodType<Prisma.GroupCreateManyTournamentInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TeamUpdateWithoutTournamentInputSchema: z.ZodType<Prisma.TeamUpdateWithoutTournamentInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUpdateManyWithoutLooserNestedInputSchema).optional(),
  group: z.lazy(() => GroupUpdateOneWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutTournamentInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutTournamentInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutLooserNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateManyWithoutTournamentInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutTournamentInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MatchUpdateWithoutTournamentInputSchema: z.ZodType<Prisma.MatchUpdateWithoutTournamentInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team1: z.lazy(() => TeamUpdateOneRequiredWithoutTeam1MatchesNestedInputSchema).optional(),
  team2: z.lazy(() => TeamUpdateOneRequiredWithoutTeam2MatchesNestedInputSchema).optional(),
  winner: z.lazy(() => TeamUpdateOneWithoutWinnerMatchesNestedInputSchema).optional(),
  looser: z.lazy(() => TeamUpdateOneWithoutLooserMatchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutTournamentInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutTournamentInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team2Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  looserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutTournamentInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutTournamentInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team2Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  looserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GroupUpdateWithoutTournamentInputSchema: z.ZodType<Prisma.GroupUpdateWithoutTournamentInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateWithoutTournamentInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutTournamentInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateManyWithoutTournamentInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateManyWithoutTournamentInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerCreateManyTeamInputSchema: z.ZodType<Prisma.PlayerCreateManyTeamInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MatchCreateManyTeam1InputSchema: z.ZodType<Prisma.MatchCreateManyTeam1Input> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team2Id: z.string(),
  winnerId: z.string().optional().nullable(),
  looserId: z.string().optional().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const MatchCreateManyTeam2InputSchema: z.ZodType<Prisma.MatchCreateManyTeam2Input> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Id: z.string(),
  winnerId: z.string().optional().nullable(),
  looserId: z.string().optional().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const MatchCreateManyWinnerInputSchema: z.ZodType<Prisma.MatchCreateManyWinnerInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Id: z.string(),
  team2Id: z.string(),
  looserId: z.string().optional().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const MatchCreateManyLooserInputSchema: z.ZodType<Prisma.MatchCreateManyLooserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team1Id: z.string(),
  team2Id: z.string(),
  winnerId: z.string().optional().nullable(),
  tournamentId: z.string(),
  team1Score: z.number().int(),
  team2Score: z.number().int()
}).strict();

export const PlayerUpdateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpdateWithoutTeamInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateWithoutTeamInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerUncheckedUpdateManyWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateManyWithoutTeamInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUpdateWithoutTeam1InputSchema: z.ZodType<Prisma.MatchUpdateWithoutTeam1Input> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2: z.lazy(() => TeamUpdateOneRequiredWithoutTeam2MatchesNestedInputSchema).optional(),
  winner: z.lazy(() => TeamUpdateOneWithoutWinnerMatchesNestedInputSchema).optional(),
  looser: z.lazy(() => TeamUpdateOneWithoutLooserMatchesNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutMatchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutTeam1InputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutTeam1Input> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team2Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  looserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutTeam1InputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutTeam1Input> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team2Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  looserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUpdateWithoutTeam2InputSchema: z.ZodType<Prisma.MatchUpdateWithoutTeam2Input> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team1: z.lazy(() => TeamUpdateOneRequiredWithoutTeam1MatchesNestedInputSchema).optional(),
  winner: z.lazy(() => TeamUpdateOneWithoutWinnerMatchesNestedInputSchema).optional(),
  looser: z.lazy(() => TeamUpdateOneWithoutLooserMatchesNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutMatchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutTeam2InputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutTeam2Input> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  looserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutTeam2InputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutTeam2Input> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  looserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUpdateWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUpdateWithoutWinnerInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team1: z.lazy(() => TeamUpdateOneRequiredWithoutTeam1MatchesNestedInputSchema).optional(),
  team2: z.lazy(() => TeamUpdateOneRequiredWithoutTeam2MatchesNestedInputSchema).optional(),
  looser: z.lazy(() => TeamUpdateOneWithoutLooserMatchesNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutMatchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutWinnerInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team2Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  looserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutWinnerInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team2Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  looserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUpdateWithoutLooserInputSchema: z.ZodType<Prisma.MatchUpdateWithoutLooserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team1: z.lazy(() => TeamUpdateOneRequiredWithoutTeam1MatchesNestedInputSchema).optional(),
  team2: z.lazy(() => TeamUpdateOneRequiredWithoutTeam2MatchesNestedInputSchema).optional(),
  winner: z.lazy(() => TeamUpdateOneWithoutWinnerMatchesNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutMatchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutLooserInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutLooserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team2Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutLooserInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutLooserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team1Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team2Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team1Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team2Score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamCreateManyGroupInputSchema: z.ZodType<Prisma.TeamCreateManyGroupInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournamentId: z.string()
}).strict();

export const TeamUpdateWithoutGroupInputSchema: z.ZodType<Prisma.TeamUpdateWithoutGroupInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUpdateManyWithoutLooserNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutGroupInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  team1Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam1NestedInputSchema).optional(),
  team2Matches: z.lazy(() => MatchUncheckedUpdateManyWithoutTeam2NestedInputSchema).optional(),
  winnerMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  looserMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutLooserNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateManyWithoutGroupInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutGroupInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TournamentFindFirstArgsSchema: z.ZodType<Prisma.TournamentFindFirstArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereInputSchema.optional(),
  orderBy: z.union([ TournamentOrderByWithRelationInputSchema.array(),TournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TournamentScalarFieldEnumSchema,TournamentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TournamentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TournamentFindFirstOrThrowArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereInputSchema.optional(),
  orderBy: z.union([ TournamentOrderByWithRelationInputSchema.array(),TournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TournamentScalarFieldEnumSchema,TournamentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TournamentFindManyArgsSchema: z.ZodType<Prisma.TournamentFindManyArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereInputSchema.optional(),
  orderBy: z.union([ TournamentOrderByWithRelationInputSchema.array(),TournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TournamentScalarFieldEnumSchema,TournamentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TournamentAggregateArgsSchema: z.ZodType<Prisma.TournamentAggregateArgs> = z.object({
  where: TournamentWhereInputSchema.optional(),
  orderBy: z.union([ TournamentOrderByWithRelationInputSchema.array(),TournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TournamentGroupByArgsSchema: z.ZodType<Prisma.TournamentGroupByArgs> = z.object({
  where: TournamentWhereInputSchema.optional(),
  orderBy: z.union([ TournamentOrderByWithAggregationInputSchema.array(),TournamentOrderByWithAggregationInputSchema ]).optional(),
  by: TournamentScalarFieldEnumSchema.array(),
  having: TournamentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TournamentFindUniqueArgsSchema: z.ZodType<Prisma.TournamentFindUniqueArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereUniqueInputSchema,
}).strict() ;

export const TournamentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TournamentFindUniqueOrThrowArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereUniqueInputSchema,
}).strict() ;

export const TeamFindFirstArgsSchema: z.ZodType<Prisma.TeamFindFirstArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamScalarFieldEnumSchema,TeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeamFindFirstOrThrowArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamScalarFieldEnumSchema,TeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamFindManyArgsSchema: z.ZodType<Prisma.TeamFindManyArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamScalarFieldEnumSchema,TeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamAggregateArgsSchema: z.ZodType<Prisma.TeamAggregateArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TeamGroupByArgsSchema: z.ZodType<Prisma.TeamGroupByArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithAggregationInputSchema.array(),TeamOrderByWithAggregationInputSchema ]).optional(),
  by: TeamScalarFieldEnumSchema.array(),
  having: TeamScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TeamFindUniqueArgsSchema: z.ZodType<Prisma.TeamFindUniqueArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const TeamFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeamFindUniqueOrThrowArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const PlayerFindFirstArgsSchema: z.ZodType<Prisma.PlayerFindFirstArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerScalarFieldEnumSchema,PlayerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlayerFindFirstOrThrowArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerScalarFieldEnumSchema,PlayerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerFindManyArgsSchema: z.ZodType<Prisma.PlayerFindManyArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerScalarFieldEnumSchema,PlayerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerAggregateArgsSchema: z.ZodType<Prisma.PlayerAggregateArgs> = z.object({
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlayerGroupByArgsSchema: z.ZodType<Prisma.PlayerGroupByArgs> = z.object({
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithAggregationInputSchema.array(),PlayerOrderByWithAggregationInputSchema ]).optional(),
  by: PlayerScalarFieldEnumSchema.array(),
  having: PlayerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlayerFindUniqueArgsSchema: z.ZodType<Prisma.PlayerFindUniqueArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const PlayerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlayerFindUniqueOrThrowArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const GroupFindFirstArgsSchema: z.ZodType<Prisma.GroupFindFirstArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereInputSchema.optional(),
  orderBy: z.union([ GroupOrderByWithRelationInputSchema.array(),GroupOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupScalarFieldEnumSchema,GroupScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GroupFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GroupFindFirstOrThrowArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereInputSchema.optional(),
  orderBy: z.union([ GroupOrderByWithRelationInputSchema.array(),GroupOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupScalarFieldEnumSchema,GroupScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GroupFindManyArgsSchema: z.ZodType<Prisma.GroupFindManyArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereInputSchema.optional(),
  orderBy: z.union([ GroupOrderByWithRelationInputSchema.array(),GroupOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupScalarFieldEnumSchema,GroupScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GroupAggregateArgsSchema: z.ZodType<Prisma.GroupAggregateArgs> = z.object({
  where: GroupWhereInputSchema.optional(),
  orderBy: z.union([ GroupOrderByWithRelationInputSchema.array(),GroupOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GroupGroupByArgsSchema: z.ZodType<Prisma.GroupGroupByArgs> = z.object({
  where: GroupWhereInputSchema.optional(),
  orderBy: z.union([ GroupOrderByWithAggregationInputSchema.array(),GroupOrderByWithAggregationInputSchema ]).optional(),
  by: GroupScalarFieldEnumSchema.array(),
  having: GroupScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GroupFindUniqueArgsSchema: z.ZodType<Prisma.GroupFindUniqueArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereUniqueInputSchema,
}).strict() ;

export const GroupFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GroupFindUniqueOrThrowArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereUniqueInputSchema,
}).strict() ;

export const MatchFindFirstArgsSchema: z.ZodType<Prisma.MatchFindFirstArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchScalarFieldEnumSchema,MatchScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MatchFindFirstOrThrowArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchScalarFieldEnumSchema,MatchScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchFindManyArgsSchema: z.ZodType<Prisma.MatchFindManyArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchScalarFieldEnumSchema,MatchScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchAggregateArgsSchema: z.ZodType<Prisma.MatchAggregateArgs> = z.object({
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MatchGroupByArgsSchema: z.ZodType<Prisma.MatchGroupByArgs> = z.object({
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithAggregationInputSchema.array(),MatchOrderByWithAggregationInputSchema ]).optional(),
  by: MatchScalarFieldEnumSchema.array(),
  having: MatchScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MatchFindUniqueArgsSchema: z.ZodType<Prisma.MatchFindUniqueArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const MatchFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MatchFindUniqueOrThrowArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const TournamentCreateArgsSchema: z.ZodType<Prisma.TournamentCreateArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  data: z.union([ TournamentCreateInputSchema,TournamentUncheckedCreateInputSchema ]),
}).strict() ;

export const TournamentUpsertArgsSchema: z.ZodType<Prisma.TournamentUpsertArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereUniqueInputSchema,
  create: z.union([ TournamentCreateInputSchema,TournamentUncheckedCreateInputSchema ]),
  update: z.union([ TournamentUpdateInputSchema,TournamentUncheckedUpdateInputSchema ]),
}).strict() ;

export const TournamentCreateManyArgsSchema: z.ZodType<Prisma.TournamentCreateManyArgs> = z.object({
  data: z.union([ TournamentCreateManyInputSchema,TournamentCreateManyInputSchema.array() ]),
}).strict() ;

export const TournamentDeleteArgsSchema: z.ZodType<Prisma.TournamentDeleteArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereUniqueInputSchema,
}).strict() ;

export const TournamentUpdateArgsSchema: z.ZodType<Prisma.TournamentUpdateArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  data: z.union([ TournamentUpdateInputSchema,TournamentUncheckedUpdateInputSchema ]),
  where: TournamentWhereUniqueInputSchema,
}).strict() ;

export const TournamentUpdateManyArgsSchema: z.ZodType<Prisma.TournamentUpdateManyArgs> = z.object({
  data: z.union([ TournamentUpdateManyMutationInputSchema,TournamentUncheckedUpdateManyInputSchema ]),
  where: TournamentWhereInputSchema.optional(),
}).strict() ;

export const TournamentDeleteManyArgsSchema: z.ZodType<Prisma.TournamentDeleteManyArgs> = z.object({
  where: TournamentWhereInputSchema.optional(),
}).strict() ;

export const TeamCreateArgsSchema: z.ZodType<Prisma.TeamCreateArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  data: z.union([ TeamCreateInputSchema,TeamUncheckedCreateInputSchema ]),
}).strict() ;

export const TeamUpsertArgsSchema: z.ZodType<Prisma.TeamUpsertArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
  create: z.union([ TeamCreateInputSchema,TeamUncheckedCreateInputSchema ]),
  update: z.union([ TeamUpdateInputSchema,TeamUncheckedUpdateInputSchema ]),
}).strict() ;

export const TeamCreateManyArgsSchema: z.ZodType<Prisma.TeamCreateManyArgs> = z.object({
  data: z.union([ TeamCreateManyInputSchema,TeamCreateManyInputSchema.array() ]),
}).strict() ;

export const TeamDeleteArgsSchema: z.ZodType<Prisma.TeamDeleteArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const TeamUpdateArgsSchema: z.ZodType<Prisma.TeamUpdateArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  data: z.union([ TeamUpdateInputSchema,TeamUncheckedUpdateInputSchema ]),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const TeamUpdateManyArgsSchema: z.ZodType<Prisma.TeamUpdateManyArgs> = z.object({
  data: z.union([ TeamUpdateManyMutationInputSchema,TeamUncheckedUpdateManyInputSchema ]),
  where: TeamWhereInputSchema.optional(),
}).strict() ;

export const TeamDeleteManyArgsSchema: z.ZodType<Prisma.TeamDeleteManyArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
}).strict() ;

export const PlayerCreateArgsSchema: z.ZodType<Prisma.PlayerCreateArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  data: z.union([ PlayerCreateInputSchema,PlayerUncheckedCreateInputSchema ]),
}).strict() ;

export const PlayerUpsertArgsSchema: z.ZodType<Prisma.PlayerUpsertArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
  create: z.union([ PlayerCreateInputSchema,PlayerUncheckedCreateInputSchema ]),
  update: z.union([ PlayerUpdateInputSchema,PlayerUncheckedUpdateInputSchema ]),
}).strict() ;

export const PlayerCreateManyArgsSchema: z.ZodType<Prisma.PlayerCreateManyArgs> = z.object({
  data: z.union([ PlayerCreateManyInputSchema,PlayerCreateManyInputSchema.array() ]),
}).strict() ;

export const PlayerDeleteArgsSchema: z.ZodType<Prisma.PlayerDeleteArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const PlayerUpdateArgsSchema: z.ZodType<Prisma.PlayerUpdateArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  data: z.union([ PlayerUpdateInputSchema,PlayerUncheckedUpdateInputSchema ]),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const PlayerUpdateManyArgsSchema: z.ZodType<Prisma.PlayerUpdateManyArgs> = z.object({
  data: z.union([ PlayerUpdateManyMutationInputSchema,PlayerUncheckedUpdateManyInputSchema ]),
  where: PlayerWhereInputSchema.optional(),
}).strict() ;

export const PlayerDeleteManyArgsSchema: z.ZodType<Prisma.PlayerDeleteManyArgs> = z.object({
  where: PlayerWhereInputSchema.optional(),
}).strict() ;

export const GroupCreateArgsSchema: z.ZodType<Prisma.GroupCreateArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  data: z.union([ GroupCreateInputSchema,GroupUncheckedCreateInputSchema ]),
}).strict() ;

export const GroupUpsertArgsSchema: z.ZodType<Prisma.GroupUpsertArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereUniqueInputSchema,
  create: z.union([ GroupCreateInputSchema,GroupUncheckedCreateInputSchema ]),
  update: z.union([ GroupUpdateInputSchema,GroupUncheckedUpdateInputSchema ]),
}).strict() ;

export const GroupCreateManyArgsSchema: z.ZodType<Prisma.GroupCreateManyArgs> = z.object({
  data: z.union([ GroupCreateManyInputSchema,GroupCreateManyInputSchema.array() ]),
}).strict() ;

export const GroupDeleteArgsSchema: z.ZodType<Prisma.GroupDeleteArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereUniqueInputSchema,
}).strict() ;

export const GroupUpdateArgsSchema: z.ZodType<Prisma.GroupUpdateArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  data: z.union([ GroupUpdateInputSchema,GroupUncheckedUpdateInputSchema ]),
  where: GroupWhereUniqueInputSchema,
}).strict() ;

export const GroupUpdateManyArgsSchema: z.ZodType<Prisma.GroupUpdateManyArgs> = z.object({
  data: z.union([ GroupUpdateManyMutationInputSchema,GroupUncheckedUpdateManyInputSchema ]),
  where: GroupWhereInputSchema.optional(),
}).strict() ;

export const GroupDeleteManyArgsSchema: z.ZodType<Prisma.GroupDeleteManyArgs> = z.object({
  where: GroupWhereInputSchema.optional(),
}).strict() ;

export const MatchCreateArgsSchema: z.ZodType<Prisma.MatchCreateArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  data: z.union([ MatchCreateInputSchema,MatchUncheckedCreateInputSchema ]),
}).strict() ;

export const MatchUpsertArgsSchema: z.ZodType<Prisma.MatchUpsertArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
  create: z.union([ MatchCreateInputSchema,MatchUncheckedCreateInputSchema ]),
  update: z.union([ MatchUpdateInputSchema,MatchUncheckedUpdateInputSchema ]),
}).strict() ;

export const MatchCreateManyArgsSchema: z.ZodType<Prisma.MatchCreateManyArgs> = z.object({
  data: z.union([ MatchCreateManyInputSchema,MatchCreateManyInputSchema.array() ]),
}).strict() ;

export const MatchDeleteArgsSchema: z.ZodType<Prisma.MatchDeleteArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const MatchUpdateArgsSchema: z.ZodType<Prisma.MatchUpdateArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  data: z.union([ MatchUpdateInputSchema,MatchUncheckedUpdateInputSchema ]),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const MatchUpdateManyArgsSchema: z.ZodType<Prisma.MatchUpdateManyArgs> = z.object({
  data: z.union([ MatchUpdateManyMutationInputSchema,MatchUncheckedUpdateManyInputSchema ]),
  where: MatchWhereInputSchema.optional(),
}).strict() ;

export const MatchDeleteManyArgsSchema: z.ZodType<Prisma.MatchDeleteManyArgs> = z.object({
  where: MatchWhereInputSchema.optional(),
}).strict() ;