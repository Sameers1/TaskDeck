
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Vote {
  userId: string;
  userName: string;
  value: number | string;
}

interface VotingResultProps {
  votes: Vote[];
  finalValue?: number | string;
}

const VotingResult: React.FC<VotingResultProps> = ({ votes, finalValue }) => {
  // Calculate the average numeric vote if possible
  const numericVotes = votes
    .filter(vote => typeof vote.value === 'number')
    .map(vote => Number(vote.value));
  
  const average = numericVotes.length > 0 
    ? (numericVotes.reduce((sum, val) => sum + val, 0) / numericVotes.length).toFixed(1)
    : 'N/A';

  // Count votes per value
  const voteDistribution: Record<string, number> = {};
  votes.forEach(vote => {
    const valueStr = String(vote.value);
    voteDistribution[valueStr] = (voteDistribution[valueStr] || 0) + 1;
  });

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between">
          <span>Voting Results</span>
          {finalValue && <span className="text-scrum-purple">Final: {finalValue}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Average</div>
          <div className="text-2xl font-bold text-scrum-darkPurple">{average}</div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Vote Distribution</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(voteDistribution).map(([value, count]) => (
              <div key={value} className="bg-muted px-3 py-1 rounded-full text-sm">
                {value}: {count}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Individual Votes</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {votes.map((vote, idx) => (
              <div key={idx} className="bg-muted px-3 py-2 rounded">
                <div className="font-medium truncate">{vote.userName}</div>
                <div className="text-lg font-bold text-scrum-purple">{vote.value}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VotingResult;
