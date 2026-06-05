from django.core.management.base import BaseCommand
from datetime import datetime
from pymongo import MongoClient


class Command(BaseCommand):
    help = "Populate DB using PyMongo with integer ids (compatible with Djongo/Django ORM reads)"

    def handle(self, *args, **options):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections we will recreate
        for name in ['octofit_tracker_user', 'octofit_tracker_team', 'octofit_tracker_activity', 'octofit_tracker_workout', 'octofit_tracker_leaderboard', 'octofit_tracker_team_members', 'octofit_tracker_workout_suggested_for']:
            if name in db.list_collection_names():
                db.drop_collection(name)

        now = datetime.utcnow()

        users = [
            {'id': 1, 'username': 'Superman', 'email': 'superman@dc.com', 'date_joined': now},
            {'id': 2, 'username': 'Batman', 'email': 'batman@dc.com', 'date_joined': now},
            {'id': 3, 'username': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'date_joined': now},
            {'id': 4, 'username': 'Iron Man', 'email': 'ironman@marvel.com', 'date_joined': now},
            {'id': 5, 'username': 'Captain America', 'email': 'cap@marvel.com', 'date_joined': now},
            {'id': 6, 'username': 'Black Widow', 'email': 'widow@marvel.com', 'date_joined': now},
        ]

        teams = [
            {'id': 1, 'name': 'Marvel', 'created_at': now},
            {'id': 2, 'name': 'DC', 'created_at': now},
        ]

        activities = [
            {'id': 1, 'user_id': 1, 'type': 'Flight', 'duration': 60, 'date': now},
            {'id': 2, 'user_id': 2, 'type': 'Martial Arts', 'duration': 45, 'date': now},
            {'id': 3, 'user_id': 4, 'type': 'Suit Training', 'duration': 50, 'date': now},
        ]

        workouts = [
            {'id': 1, 'name': 'Strength Training', 'description': 'Full body strength', 'difficulty': 'Medium'},
            {'id': 2, 'name': 'Cardio', 'description': 'Endurance work', 'difficulty': 'Easy'},
        ]

        leaderboard = [
            {'id': 1, 'team_id': 1, 'score': 150},
            {'id': 2, 'team_id': 2, 'score': 140},
        ]

        db['octofit_tracker_user'].insert_many(users)
        db['octofit_tracker_team'].insert_many(teams)
        db['octofit_tracker_activity'].insert_many(activities)
        db['octofit_tracker_workout'].insert_many(workouts)
        db['octofit_tracker_leaderboard'].insert_many(leaderboard)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with integer-id documents.'))
