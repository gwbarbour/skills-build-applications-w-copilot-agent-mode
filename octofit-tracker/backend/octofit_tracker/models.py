from djongo import models

# User model
class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.username

# Team model
class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    members = models.ManyToManyField(User, related_name='teams')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

# Activity model
class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    type = models.CharField(max_length=50)
    duration = models.PositiveIntegerField(help_text='Duration in minutes')
    date = models.DateField()
    def __str__(self):
        return f"{self.user.username} - {self.type} ({self.date})"

# Workout model
class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    suggested_for = models.ManyToManyField(User, blank=True, related_name='suggested_workouts')
    def __str__(self):
        return self.name

# Leaderboard model
class Leaderboard(models.Model):
    team = models.OneToOneField(Team, on_delete=models.CASCADE, related_name='leaderboard')
    score = models.PositiveIntegerField(default=0)
    def __str__(self):
        return f"{self.team.name} Leaderboard"